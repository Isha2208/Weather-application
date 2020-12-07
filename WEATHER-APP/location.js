const request = require("request");

var getLocation = (loc, callback) => {
  var encodedLocation = encodeURIComponent(loc);
  request(
    {
      uri: `https://api.mapbox.com/geocoding/v5/mapbox.places/${loc}.json?access_token=pk.eyJ1IjoiZGl2eTEyMyIsImEiOiJjazVkdGNqNW8wN2gwM2xsZW92MmlsdXVvIn0.JOluUvRbsuFyYwxJlxpErA&limit=1`,
      json: true
    },
    (error, response, body) => {
      if (error) {
        callback("Unable to connect");
      } else if (response.body.features.length === 0) {
        callback("Unable to find location");
      } else  {
        callback(undefined, {
          latitude: response.body.features[0].center[1],
          longitude: response.body.features[0].center[0]
        });
      }
    }
  );
};
module.exports = { getLocation };