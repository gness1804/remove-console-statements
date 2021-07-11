import meow from 'meow';
import meowHelp from 'cli-meow-help';

const flags = {
  debug: {
    type: 'boolean',
    default: false,
    alias: 'd',
    desc: 'Print debug info.',
  },
  version: {
    type: 'boolean',
    alias: 'v',
    desc: 'Print CLI version.',
  },
  list: {
    type: 'boolean',
    alias: 'l',
    desc: 'Show number of "console.*" statements in each modified file. Files need to be tracked to be counted.',
  },
  diff: {
    type: 'boolean',
    alias: 'i',
    desc: 'Show number of "console.*" statements introduced into each modified file since the last commit. Looks at unstaged changes. Files need to be tracked to be counted.',
  },
  file: {
    type: 'string',
    alias: 'f',
    desc: 'Remove introduced "console.*" statements from a file specified. Must enter a valid file path.',
  },
};

const commands = {
  help: {
    desc: 'Show help info.',
  },
};

const helpText = meowHelp({
  name: 'rmconsole',
  flags,
  commands,
});

const options = {
  importMeta: import.meta,
  inferType: true,
  description: false,
  hardRejection: false,
  flags,
};

const func = meow(helpText, options);
export default func;
