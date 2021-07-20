import handleError from 'cli-handle-error';
import execa from 'execa';
import fs from 'fs';
import exists from '../utils/exists.js';
import { regexDiffReplacer, regexDiffShort } from '../utils/regexes.js';
import alert from 'cli-alerts';

const { readFile, writeFile } = fs.promises;

const removeStatementsFromFile = async (file) => {
  if (!file)
    handleError(
      'No file given! You must enter a valid file path',
      { path: 'No file given! You must enter a valid file path' },
      true,
      true,
    );

  if (!exists(file))
    handleError(
      `No file with the path ${file} exists. Please enter a valid file path.`,
      {
        path: `No file with the path ${file} exists. Please enter a valid file path.`,
      },
      true,
      true,
    );

  const { stdout: data } = await execa.command(`git diff ${file}`);
  const resultsOneLine = data.match(regexDiffReplacer);
  const allResults = data.match(regexDiffShort);

  if (resultsOneLine && resultsOneLine.length) {
    let text = await readFile(file, 'utf8');

    for (let res of resultsOneLine) {
      res = res.replace(/\+/, '');
      text = text.replace(res, '');
    }

    await writeFile(file, text, 'utf8');
    alert({
      type: 'success',
      msg: `Successfully removed ${resultsOneLine.length} introduced console statements from ${file}`,
    });

    if (allResults.length > resultsOneLine.length) {
      alert({
        type: 'warning',
        msg: `There are ${
          allResults.length - resultsOneLine.length
        } console.* statements remaining in ${file}. These must be removed manually.`,
      });
    }
  } else if (allResults && allResults.length) {
    // only multiline statements.
    alert({
      type: 'warning',
      msg: `There are ${allResults.length} multiline console.* statements remaining in ${file}. These must be removed manually.`,
    });
  }
};

export default removeStatementsFromFile;
