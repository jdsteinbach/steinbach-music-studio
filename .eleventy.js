const markdownIt = require('markdown-it');

const mdOptions = {
  html: true,
  breaks: true,
  linkify: true,
  typographer: true
};
const mdAnchorOpts = {
  permalink: true,
  permalinkClass: 'anchor-link',
  permalinkSymbol: '#',
  level: [1, 2, 3, 4]
};

module.exports = eleventyConfig => {
  /**
   * Collections
   */
  eleventyConfig.addCollection('sections', collection => {
    return collection
      .getAll()
      .filter(page => page.inputPath.match(/\/sections\//) !== null)
      .sort((a, b) => a.data.section_order - b.data.section_order);
  });

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
