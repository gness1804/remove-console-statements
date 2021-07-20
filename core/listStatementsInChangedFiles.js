import execa from 'execa';
import fs from 'fs';
import alert from 'cli-alerts';
const { readFile } = fs.promises;
import exists from '../utils/exists.js';
import { regexShort } from '../utils/regexes.js';

const getChangedFiles = async () => await execa.command('git diff --name-only');

// we don't want to remove statements from these files
const filterUnwantedFiles = (files) =>
  files
    .filter((file) => file !== 'yarn.lock')
    .filter((file) => file !== 'package.json')
    .filter((file) => file !== 'package-lock.json');

const listStatementsInChangedFiles = async () => {
  const { stdout } = await getChangedFiles();
  const files = filterUnwantedFiles(stdout.split('\n'));

  for (const file of files) {
    if (file && exists(file)) {
      const data = await readFile(file, 'utf8');
      const result = data.match(regexShort);
      if (result && result.length) {
        alert({
          type: 'warning',
          msg: `There are ${result.length} console.* statements in ${file}.`,
        });
      }
    }
  }
};

export default listStatementsInChangedFiles;
