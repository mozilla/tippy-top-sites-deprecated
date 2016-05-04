const hexToRgb = require("hex-to-rgb");
const sites = require("./top_sites.json").map(site => {
  return Object.assign({}, site, {background_color_rgb: hexToRgb(site.background_color)});
});
const byUrl = {};
sites.forEach(site => {
  byUrl[site.url] = site;
});

module.exports = {
  all: sites,
  byUrl
};
