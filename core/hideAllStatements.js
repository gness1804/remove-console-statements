import execa from 'execa';
import fs from 'fs';
import alert from 'cli-alerts';
import exists from '../utils/exists.js';
import { regexDiffReplacer, regexDiffShort } from '../utils/regexes.js';

const { readFile, writeFile } = fs.promises;

const getChangedFiles = async () => await execa.command('git diff --name-only');

const hideStatementsInFile = async (file) => {
  const { stdout: data } = await execa.command(`git diff ${file}`);
  const resultsOneLine = data.match(regexDiffReplacer);
  const allResults = data.match(regexDiffShort);

  let hiddenCount = 0;

  if (resultsOneLine && resultsOneLine.length) {
    let text = await readFile(file, 'utf8');

    for (let res of resultsOneLine) {
      res = res.replace(/\+/, '');
      // we don't want to hide statements that are already hidden
      if (!res.match(/^\/\//)) {
        text = text.replace(res, `//${res}`);
        hiddenCount++;
      }
    }

    await writeFile(file, text, 'utf8');
    hiddenCount > 0 &&
      alert({
        type: 'success',
        msg: `Successfully hid ${hiddenCount} introduced console statements from ${file}`,
      });

    if (allResults.length > resultsOneLine.length) {
      alert({
        type: 'warning',
        msg: `There are ${
          allResults.length - resultsOneLine.length
        } console.* statements remaining in ${file}. These must be hidden manually.`,
      });
    }
  } else if (allResults && allResults.length) {
    // only multiline statements.
    alert({
      type: 'warning',
      msg: `There are ${allResults.length} multiline console.* statements remaining in ${file}. These must be hidden manually.`,
    });
  }
};

// we don't want to remove statements from these files
const filterUnwantedFiles = (files) =>
  files
    .filter((file) => file !== 'yarn.lock')
    .filter((file) => file !== 'package.json')
    .filter((file) => file !== 'package-lock.json');

const hideAllStatements = async () => {
  const { stdout } = await getChangedFiles();
  const files = filterUnwantedFiles(stdout.split('\n'));

  for (const file of files) {
    if (file && exists(file)) {
      await hideStatementsInFile(file);
    }
  }
};

export default hideAllStatements;
