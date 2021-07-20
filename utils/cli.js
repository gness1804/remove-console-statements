import meow from 'meow';
import meowHelp from 'cli-meow-help';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pkg = require('../package.json');

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
    desc: 'Remove all introduced "console.*" statements from a file specified. Must enter a valid file path.',
  },
  bulk: {
    type: 'boolean',
    alias: 'b',
    desc: 'Remove all introduced "console.*" statements from all changed files. Files need to be tracked to be counted.',
  },
};

const commands = {
  help: {
    desc: 'Show help info.',
  },
};

const helpText = meowHelp({
  name: `npx ${pkg.name}`,
  desc: pkg.description,
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
