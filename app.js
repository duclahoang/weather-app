require('dotenv').config();
let key_googleapis = process.env.KEY_googleapis;

const yargs = require('yargs');
const request = require('request');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

// geocode.geocodeAddress(argv.address,(errorMessage,results)=> {
//   if(errorMessage) {
//     console.log(errorMessage);
//   }
//   else {
//     console.log(JSON.stringify(results, undefined, 2));
//     weather.getWeather(results.latitude,results.longitude,(errorMessage, results) => {
//       if(errorMessage) {
//         console.log(errorMessage);
//       }
//       else {
//         console.log(JSON.stringify(results, undefined, 2));
//       }
//     });
//   }
// });

// use promise instead of traditional arrow function
geocode.geocodeAddressAsync(argv.address).then((results) => {
  console.log(JSON.stringify(results, undefined, 2));
      weather.getWeather(results.latitude,results.longitude,(errorMessage, results) => {
        if(errorMessage) {
          console.log(errorMessage);
        }
        else {
          console.log(JSON.stringify(results, undefined, 2));
        }
      });
}, (errorMessage) => {
  console.log(errorMessage);
});
