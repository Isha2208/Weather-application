const yargs = require("yargs");

const { getWeather } = require("./weather.js");
const { getLocation } = require("./location");

var argv = yargs
  .options({
    l: {
      demand: true,
      alias: "location",
      string: true
    }
  })
  .help().argv;
var res = getLocation(argv.l, (errormessage, results) => {
  if (errormessage) {
    console.log(errormessage);
  } else {
    getWeather(
      results.latitude,
      results.longitude,
      (errorMessage, weatherResults) => {
        if (errorMessage) {
          console.log(errorMessage);
        } else {
          console.log(
            `Temperature: ${(weatherResults.temperature - 32) * 0.55} celcius`
          );
        }
      }
    );
  }
});