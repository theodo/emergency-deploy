const gpio = require('gpio');
// const spawn = require('child_process').spawn;

const gpio22 = gpio.export(2, {
  direction: 'in',
  ready() {
    console.log('GPIO is ready :)')
  }
});

gpio22.on('change', val => {
  console.log(val);
  // const deploy = spawn('make', ['staging-fast-deploy']);
  // deploy.stdout.pipe(process.stdout);
});
