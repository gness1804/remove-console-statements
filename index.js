#!/usr/bin/env node

/**
 * remove-console-statements
 * Removes console.* statements from your code.
 * @author Graham Nessler
 */

import handleError from 'cli-handle-error';
import init from './utils/init.js';
import cli from './utils/cli.js';
import log from './utils/log.js';
import listStatementsInChangedFiles from './core/listStatementsInChangedFiles.js';
import listStatementsInDiffs from './core/listStatementsInDiffs.js';
import removeStatementsFromFile from './core/removeStatementsFromFile.js';
import removeAllStatements from './core/removeAllStatements.js';

const { input, flags } = cli;
const { debug, list, diff, file, bulk } = flags;

(async () => {
  init();

  // show help if requested
  input.includes('help') && cli.showHelp(0);

  debug && log(flags);

  if ((process.argv.includes('-f') || process.argv.includes('--file')) && !file)
    handleError('You must enter a valid file path if using the --file flag.', {
      message: 'You must enter a valid file path if using the --file flag.',
    });

  if (list) {
    try {
      await listStatementsInChangedFiles();
    } catch (error) {
      handleError('Problem listing console statements in files', error);
    }
  } else if (diff) {
    try {
      await listStatementsInDiffs();
    } catch (error) {
      handleError('Problem listing console statements in file diffs', error);
    }
  } else if (file) {
    try {
      await removeStatementsFromFile(file);
    } catch (error) {
      handleError('Problem removing console statements from file', error);
    }
  } else if (bulk) {
    try {
      await removeAllStatements();
    } catch (error) {
      handleError(
        'Problem removing all console statements in file diffs',
        error,
      );
    }
  } else {
    // fall back to just listing statements in changed files; same as "--list"
    try {
      await listStatementsInChangedFiles();
    } catch (error) {
      handleError('Problem listing console statements in files', error);
    }
  }
})();
