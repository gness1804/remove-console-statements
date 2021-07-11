#!/usr/bin/env node

/**
 * remove-console-statements
 * Removes console.* statements from your code.
 * @author Graham Nessler
 */

import init from './utils/init.js';
import cli from './utils/cli.js';
import log from './utils/log.js';

const { input, flags } = cli;
const { debug } = flags;

(async () => {
  init();

  // show help if requested
  input.includes('help') && cli.showHelp(0);

  /*eslint-disable-next-line no-console */
  console.info(
    'If you can read this, the CLI works! Now on to the hard part...',
  );

  debug && log(flags);
})();
