const request = require("request");

const forecast = (lat, lon, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=2ecc14b516828897df31ee4e4e778568&query=" +
    lat +
    "," +
    lon +
    "&units=m";

  request({ url, json: true }, (errors, { body }) => {
    if (errors) {
      callback("unable to connect ", undefined);
    } else if (body.success === false) {
      console.log("Enter a valid Location", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions +
          ". It is currently " +
          body.current.temperature +
          " degrees out. Its feels like " +
          body.current.feelslike +
          " degrees out"
      );
    }
  });
};

module.exports = forecast;
