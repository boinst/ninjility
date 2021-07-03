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

  // Register the shortcode "excerpt"
  eleventyConfig.addShortcode('excerpt', article => extractExcerpt(article));


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

// This code is used to find an excerpt within an article.
// From here: https://keepinguptodate.com/pages/2019/06/creating-blog-with-eleventy/
function extractExcerpt(article) {
  if (!article.hasOwnProperty('templateContent')) {
    console.warn('Failed to extract excerpt: Document has no property "templateContent".');
    return null;
  }
 
  let excerpt = null;
  const content = article.templateContent;
 
  // The start and end separators to try and match to extract the excerpt
  const separatorsList = [
    { start: '<!-- Excerpt Start -->', end: '<!-- Excerpt End -->' },
    { start: '<p>', end: '</p>' }
  ];
 
  separatorsList.some(separators => {
    const startPosition = content.indexOf(separators.start);
    const endPosition = content.indexOf(separators.end);
 
    if (startPosition !== -1 && endPosition !== -1) {
      excerpt = content.substring(startPosition + separators.start.length, endPosition).trim();
      return true; // Exit out of array loop on first match
    }
  });
 
  return excerpt;
}