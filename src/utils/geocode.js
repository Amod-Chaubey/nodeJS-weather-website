const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1IjoiYW1vZGNoYXViZXkxOTk0IiwiYSI6ImNrbmxnbDF6NDBocnkydXB1enJnM2huc3MifQ.tOuHT6pjJLTm_l71oenD-g";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect", undefined);
    } else if (body.features.length === 0) {
      callback("Not a Valid Address", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
