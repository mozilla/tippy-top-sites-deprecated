"use strict";

const hexToRgb = require("hex-to-rgb");
const urlParse = require("url-parse");

const sites = require("./top_sites.json").map(site => {
  return Object.assign({}, site, {background_color_rgb: hexToRgb(site.background_color)});
});

function getDomain(url) {
  let domain = urlParse(url, false).host;
  if (domain && domain.startsWith("www.")) {
    domain = domain.slice(4);
  }
  return domain;
}

const sitesByDomain = {};
sites.forEach(site => {
  if ("url" in site) {
    sitesByDomain[getDomain(site.url)] = site;
  }
  if ("urls" in site) {
    for (let url of site.urls) {
      sitesByDomain[getDomain(url)] = site;
    }
  }
});

/**
 * Get the site data for the given url.
 * Returns and empty object if there is no match.
 */
function getSiteData(url) {
  let siteData = {};
  let key;
  try {
    key = getDomain(url);
  } catch (e) {
    key = null;
  }
  if (key && key in sitesByDomain) {
    siteData = sitesByDomain[key];
  }
  return sitesByDomain[key];
}

module.exports.sites = sites;
module.exports.getSiteData = getSiteData;
