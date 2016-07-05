const gpio = require('gpio');
const spawn = require('child_process').spawn;

exec('cat *.js bad_file | wc -l', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});

const gpio22 = gpio.export(22, {
  direction: 'in',
  ready() {
    console.log('GPIO is ready :)')
  }
});

gpio22.on('change', val => {
  if (val === 1) {
    console.log('Will deploy !!');
    // exec('make -f /home/pi/fastIT/www/dashboard-sirf/current/Makefile staging-fast-deploy', (error, stdout, stderr) => {
    //   if (error) {
    //     console.error(`exec error: ${error}`);
    //   }
    //   console.log(`stdout: ${stdout}`);
    //   console.log(`stderr: ${stderr}`);
    // });
    const deploy = spawn('make', ['-f', '/home/pi/fastIT/www/dashboard-sirf/current/Makefile', 'staging-fast-deploy']);
    deploy.stdout.on('data', data => console.log(`deploy: ${data.toString()}`));
    deploy.stderr.on('data', data => console.log(`deploy [error]: ${data.toString()}`));
  }
});
