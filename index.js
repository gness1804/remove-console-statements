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

const { input, flags } = cli;
const { debug, list } = flags;

(async () => {
  init();

  // show help if requested
  input.includes('help') && cli.showHelp(0);

  debug && log(flags);

  if (list) {
    try {
      await listStatementsInChangedFiles();
    } catch (error) {
      handleError('Problem listing console statements in files', error);
    }
  }
})();
