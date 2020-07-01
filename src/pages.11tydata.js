module.exports = {
  eleventyComputed: {
    title: data => data.p.title,
    order: data => data.p.order,
    content: data => {
      console.log(data.p.title, data.p.permalink)
      return data.p.content
        ? data.p.content.replace(/\\/gi, '')
        : data.p.content;
    }
  }
};
