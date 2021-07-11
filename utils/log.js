import alert from 'cli-alerts';

const func = (info) => {
  alert({
    type: 'warning',
    name: 'DEBUG LOG',
    msg: '',
  });

  /*eslint-disable-next-line no-console */
  console.info('info:', info);
};

export default func;
