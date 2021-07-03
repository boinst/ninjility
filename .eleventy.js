// The "moment" library deals with timestamps
const moment = require('moment');

// We'll use the "english" locale.
moment.locale('en');

module.exports = function (eleventyConfig) {
 
  // Provides the filter "dateIso"
  eleventyConfig.addFilter('dateIso', date => {
    return moment(date).toISOString();
  });
 
  // Provides the filter "dateReadable"
  eleventyConfig.addFilter('dateReadable', date => {
    return moment(date).utc().format('LL'); // E.g. May 31, 2019
  });

  return {
    dir: {
      input: "src",
      output: "out",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data"
    }
  };
};
