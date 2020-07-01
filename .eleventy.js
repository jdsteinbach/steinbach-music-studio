const markdownIt = require('markdown-it');

const mdOptions = {
  html: true,
  breaks: true,
  linkify: true,
  typographer: true
};

module.exports = eleventyConfig => {
  /**
   * Better Markdown
   */
  eleventyConfig.setLibrary('md', markdownIt(mdOptions));

  /**
   * Passthrough
   */
  eleventyConfig.addPassthroughCopy('src/uploads');
  eleventyConfig.addPassthroughCopy('src/assets');
  eleventyConfig.addPassthroughCopy('src/favicon.svg');

  return {
    templateFormats: [
      'liquid',
      'md',
      '11ty.js'
    ],
    dir: {
      input: 'src'
    }
  };
};
