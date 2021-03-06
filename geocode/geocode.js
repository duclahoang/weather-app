const request = require('request');
let key_googleapis = process.env.KEY_googleapis;

let geocodeAddress = (address, callback) => {
  let encodedAddress = encodeURIComponent(address);
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${key_googleapis}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect google server');
    } else if (body.status === 'ZERO_RESULTS') {
      callback('Unable to find address');
    } else if(body.status === 'OK') {
      callback(undefined,{
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });
      }
});
}

let geocodeAddressAsync = (address) => {
  return new Promise((resolve,reject) => {
    let encodedAddress = encodeURIComponent(address);
    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${key_googleapis}`,
      json: true
    }, (error, response, body) => {
      if (error) {
        reject('Unable to connect google server');
      } else if (body.status === 'ZERO_RESULTS') {
        reject('Unable to find address');
      } else if(body.status === 'OK') {
        resolve({
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        });
        }
  });
  });
}


module.exports = {
  geocodeAddress: geocodeAddress,
  geocodeAddressAsync: geocodeAddressAsync
}
