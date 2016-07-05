const gpio = require('gpio');
const spawn = require('child_process').spawn;

const gpio22 = gpio.export(22, {
  direction: 'in',
  ready() {
    console.log('GPIO is ready :)')
  }
});

let deploying = false;

gpio22.on('change', val => {
  if (val === 1 && !deploying) {
    deploying = true;
    console.log('Will deploy !!');
    const deploy = spawn('make', ['-f', '/home/pi/fastIT/www/dashboard-sirf/current/Makefile', 'staging-fast-deploy']);
    deploy.stdout.on('data', data => console.log(`deploy: ${data.toString()}`));
    deploy.stderr.on('data', data => console.log(`deploy [error]: ${data.toString()}`));
    deploy.on('close', () => {
      deploying = false;
    });
  }
});
