import execa from 'execa';
import exists from '../utils/exists.js';
import removeStatementsFromFile from './removeStatementsFromFile.js';

const getChangedFiles = async () => await execa.command('git diff --name-only');

// we don't want to remove statements from these files
const filterUnwantedFiles = (files) =>
  files
    .filter((file) => file !== 'yarn.lock')
    .filter((file) => file !== 'package.json')
    .filter((file) => file !== 'package-lock.json');

const removeAllStatements = async () => {
  const { stdout } = await getChangedFiles();
  const files = filterUnwantedFiles(stdout.split('\n'));

  for (const file of files) {
    if (file && exists(file)) {
      await removeStatementsFromFile(file);
    }
  }
};

export default removeAllStatements;
