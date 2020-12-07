const request = require("request");

var getWeather = (lats, longs, callback) => {
  var encodedlats = encodeURIComponent(lats);
  var encodedlongs = encodeURIComponent(longs);
  request(
    {
      uri: `https://api.darksky.net/forecast/289d1c1326c779e0fa79adb84177207d/${encodedlats},${encodedlongs}`,
      json: true
    },
    (error, response, body) => {
      if (error) {
        callback("Unable to connect");
      } else if (response.statusCode === 400) {
        callback("Unable to find location");
      } else if (response.statusCode === 200) {
        callback(undefined, {
          temperature: body.currently.temperature
        });
      }
    }
  );
};

module.exports = {
  getWeather
};