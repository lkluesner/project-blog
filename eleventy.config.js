export default async function(eleventyConfig) {
// Configure Eleventy
//configure css
eleventyConfig.addPassthroughCopy("./src/css");
eleventyConfig.addWatchTarget("./src/css");

return {
  dir: {
    input: "src",
    output: "public",
  },
};

};
