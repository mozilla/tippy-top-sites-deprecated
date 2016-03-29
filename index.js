const hexToRgb = require("hex-to-rgb");

const sites = require("./top_sites.json").map(site => {
  return Object.assign({}, site, {background_color_rgb: hexToRgb(site.background_color)});
});

module.exports = sites;
