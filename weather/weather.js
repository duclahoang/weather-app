const request = require('request');
let key_darksky = process.env.KEY_darksky;

let getWeather = (lat,lng,callback) => {
  request({
    url: `https://api.darksky.net/forecast/${key_darksky}/${lat},${lng}`,
    json: true
  }, (error, response, body) =>{
    if(error) {
      callback('Unable to connect darksky.net');
    } else if(response.statusCode === 400) {
      callback('Unable to fetch weather');
    } else if(response.statusCode === 200) {
      callback(undefined, {temperature: (body.currently.temperature -32)*(5/9) });
    }
  });
}

module.exports = {
  getWeather: getWeather
}
