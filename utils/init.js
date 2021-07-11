import welcome from 'cli-welcome';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pkg = require('../package.json');

import unhandled from 'cli-handle-unhandled';
import updateNotifier from 'update-notifier';

const func = () => {
  unhandled();
  welcome({
    title: 'remove-console-statements',
    tagLine: 'by Graham Nessler',
    description: pkg.description,
    version: pkg.version,
    bgColor: '#6cc24a',
    color: '#000',
    bold: true,
    clear: true,
  });

  updateNotifier({ pkg }).notify();
};

export default func;
