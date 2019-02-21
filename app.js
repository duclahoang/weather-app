require('dotenv').config();
let key = process.env.KEY;
const request = require('request');
const yargs = require('yargs');
const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'address to get weather',
      string: true
    }
  })
  .help()
  .alias('help','h')
  .argv;

let encodedAddress = encodeURIComponent(argv.address);
request({
  url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${key}`,
  json: true
}, (error, response, body) => {
  if (error) {
    console.log('Unable to connect google server');
  } else if (body.status === 'ZERO_RESULTS') {
    console.log('Unable to find address');
  } else if(body.status === 'OK') {
    console.log(`Adress: ${body.results[0].formatted_address}`);
    console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
    console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
  }

});
