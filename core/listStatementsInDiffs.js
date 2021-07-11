import execa from 'execa';
import alert from 'cli-alerts';
import exists from '../utils/exists.js';
import { consoleRegexDiff } from '../utils/regexes.js';

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
      const { stdout: data } = await execa.command(`git diff ${file}`);
      const result = data.match(consoleRegexDiff);
      if (result && result.length) {
        alert({
          type: 'warning',
          msg: `There are ${result.length} console.* statements that have been introduced in ${file}.`,
        });
      }
    }
  }
};

export default listStatementsInChangedFiles;
