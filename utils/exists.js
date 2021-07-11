import fs from 'fs';
const { access } = fs.promises;
import handleError from 'cli-handle-error';

const func = async (path) => {
  if (!path)
    handleError(
      `You must pass in a file or directory path to ${__filename}`,
      { message: `You must pass in a file or directory path to ${__filename}` },
      true,
      true,
    );
  access(path).then((err) => {
    if (err) return false;
    return true;
  });
};

export default func;
