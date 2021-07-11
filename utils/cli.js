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
