const gpio = require('gpio');
// const spawn = require('child_process').spawn;

const gpio22 = gpio.export(2, {
  direction: 'in',
  ready() {
    console.log('GPIO is ready :)')
  }
});

gpio22.on('change', val => {
  const deploy = spawn('make', ['-f', '/home/pi/fastIT/www/dashboard-sirf/current/Makefile', 'staging-fast-deploy']);
  deploy.stdout.on('data', data => console.log(`deploy: ${data.toString()}`));
  deploy.stderr.on('data', data => console.log(`deploy [error]: ${data.toString()}`));
});
