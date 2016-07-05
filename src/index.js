const gpio = require("gpio");
// const spawn = require('child_process').spawn;
const gpio4 = gpio.export(4, {
  direction: "in",
});

gpio4.on('change', val => {
  console.log(val);
  // const deploy = spawn('make', ['staging-fast-deploy']);
  // deploy.stdout.pipe(process.stdout);
});
