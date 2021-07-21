# remove-console-statements

> Counts and removes console.* statements from your code. A solution to console chaos!

<br />

## Why

Have you struggled with too many console.\* statements peppering your code? You know the drill: trying to debug something, you plan to add just one or two `console.log`s, but you end up with eight. (Or twenty.) Isn't it annoying to manually try to track them all down? Even with today's modern IDEs, this gets tiresome. This handy utility seeks to address this problem by enabling you to count all console.\* statements in your changed files and to delete them as well. Now also includes the capability to hide (comment out) console.\* statements! Less time struggling with console statements, and more time focusing on what really matters!

<br />

## Install

```
npm install -g remove-console-statements OR yarn global add remove-console-statements
OR
npx remove-console-statements
```

<br />

## Usage

```sh
remove-console-statements <command> [option]
rmconsole <command> [option]
```

<br />

### COMMANDS

```sh
help  Print help info
```

<br />

### OPTIONS

```sh
-d, --debug    Print debug info. Default: false
-v, --version  Print CLI version. Default: false
-l, --list     Show number of "console.*" statements in each modified file. Files need to be tracked to be counted. Default: false
-i, --diff     Show number of "console.*" statements introduced into each modified file since the last commit. Looks at unstaged changes. Files need to be tracked to be counted. Default: false
-f, --file     Remove all introduced "console.*" statements from a file specified. Must enter a valid file path. Default: false
-b, --bulk     Remove all introduced "console.*" statements from all changed files. Files need to be tracked to be counted. Default: false
-h, --hide     Hide (comment out) all introduced "console.*" statements in all changed files. Files need to be tracked to be counted. Default: false
```
Default behavior (no flags): same as `--list`.

<br />

## Examples
Given the following unstaged changed files:
```js
// index.js
import axios from 'axios';
import path from 'path';

const filePath = path.join(__dirname, './file.js');

try {
  // introduced console.* statement
  console.log(process.env.WHATEVER);
  if (process.env.WHATEVER === 'true') {
    axios.get(filePath).then(() => doSomething());
  }
} catch(error) {
  // pre-existing committed console* statement
  console.error(`Something went wrong: ${error}`)
}
```

```js
// myModule.test.js

import { myModule } from '../myModule';

it('does what it should', function() {
  const res = myModule();
  // introduced console.* statement
  console.log(res);
  expect(res).toEqual(42);
})
```

...the following commands would behave as follows:

```sh
remove-console-statements -l
# or remove-console-statements with no arguments

# Counts all console statements in these files
⚠  WARNING  There are 2 console.* statements in index.js.


⚠  WARNING  There are 1 console.* statements in myModule.test.js.

```

```sh
remove-console-statements -i

# only counts console statements introduced since in changed files
⚠  WARNING  There are 1 console.* statements that have been introduced in index.js.


⚠  WARNING  There are 1 console.* statements that have been introduced in myModule.test.js.

```

```sh
remove-console-statements -f index.js

# removed introduced console statement in the file
✔  SUCCESS  Successfully removed 1 introduced console statements from index.js
```

```sh
remove-console-statements -b

# removed all introduced console statements
✔  SUCCESS  Successfully removed 1 introduced console statements from index.js


✔  SUCCESS  Successfully removed 1 introduced console statements from myModule.test.js
```

```sh
remove-console-statements -h

# hide all introduced console statements
✔  SUCCESS  Successfully hid 1 introduced console statements from index.js


✔  SUCCESS  Successfully hid 1 introduced console statements from myModule.test.js
```


<br />


## Other Notes
* **Multiline console statements**: the app will idenity multiline console statements, but cannot automatically delete them. One example:
  ```js
  console.info(`
    something that needs more
    than one line
  `);
  ```

* **Flavors of console statements**: Right now, the app doesn't distinguish between different flavors of console statements. (for example, `console.log`, `console.error`, `console.info`, etc.) All are identified and treated the same. In a future version of the app, I will try to add the capability to distinguish between these varieties. (For instance, one might add a flag to only target `console.log`s.
* **Git**: the app uses git under the hood, so you'll need to have it installed.

## Changelog

[❯ Read the changelog here →](https://github.com/gness1804/remove-console-statements/blob/master/CHANGELOG.md)
