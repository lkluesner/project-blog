import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";



export default async function(eleventyConfig) {
// Configure Eleventy

  //configure css
  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addWatchTarget("./src/css");

  //add navbar plugin
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  //add image plugin
  eleventyConfig.addPlugin(eleventyImageTransformPlugin);

  //fonts
  eleventyConfig.addPassthroughCopy("./src/fonts");
  eleventyConfig.addWatchTarget("./src/fonts");

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };

};
