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
  try {
    await access(path);
    return true;
  } catch (error) {
    return false;
  }
};

export default func;
