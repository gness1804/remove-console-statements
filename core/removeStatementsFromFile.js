import handleError from 'cli-handle-error';
import execa from 'execa';
import fs from 'fs';
import exists from '../utils/exists.js';
import { consoleRegexDiff, consoleRegexRead } from '../utils/regexes.js';
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
  const result = data.match(consoleRegexDiff);

  if (result && result.length) {
    const text = await readFile(file, 'utf8');
    const modifiedText = text.replace(consoleRegexRead, '');
    await writeFile(file, modifiedText, 'utf8');
    alert({
      type: 'success',
      msg: `Successfully removed introduced console statements from ${file}`,
    });
  }
};

export default removeStatementsFromFile;
