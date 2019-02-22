require('dotenv').config();
let key_googleapis = process.env.KEY_googleapis;
let key_darksky = process.env.KEY_darksky;

const yargs = require('yargs');
const axios = require('axios');

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
let geocodeUrl=`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${key_googleapis}`;

axios.get(geocodeUrl).then((response) => {
  if(response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find address')
  }
  let lat = response.data.results[0].geometry.location.lat;
  let lng = response.data.results[0].geometry.location.lng;
  let weatherUrl = `https://api.darksky.net/forecast/${key_darksky}/${lat},${lng}`;
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);


}).then((response) => {
  let temperature = response.data.currently.temperature;
  console.log(`temperature: ${temperature}`);

}).catch((e) => {
  if(e.code === 'ENOTFOUND') {
    console.log('Unable to connect api!');
  } else {
    console.log(e.message);
  }
});
