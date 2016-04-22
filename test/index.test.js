const exists = require("fs").existsSync;
const join = require("path").join;
const assert = require("chai").assert;
const hexToRgb = require("hex-to-rgb");
const validator = require("validator");
const data = require("../top_sites.json");
const exported = require("../index");

describe("top_sites", () => {
  it("should be an array", () => {
    assert.isArray(data);
  });
  data.forEach((site, i) => {
    describe(`#${i + 1} ${site.title}`, () => {
      it("should be an object", () => {
        assert.isObject(site);
      });
      it("should have a non-empty title", () => {
        assert.property(site, "title");
        assert.ok(site.title);
        assert.isString(site.title);
      });
      it("should have a valid url", () => {
        assert.property(site, "url");
        assert.isString(site.url);
        assert.isTrue(validator.isURL(site.url, {require_protocol: true}), `expected ${site.url} to be a valid url`);
      });
      it("should have an image_url pointing to a .png or .svg image prefixed with images/", () => {
        assert.property(site, "image_url");
        assert.isString(site.image_url);
        assert.match(site.image_url, /\.(png|svg)$/, `expected ${site.image_url} to be a .png or .svg image`);
        assert.isTrue(exists(join("images", site.image_url)), `expected ${site.image_url} to be found on disk`)
      });
      it("should have background color as a hex color", () => {
        assert.property(site, "background_color");
        assert.isString(site.background_color);
        assert.isTrue(validator.isHexColor(site.background_color), `expected ${site.background_color} to be a hex color`)
      });
    });
  });
});

describe("exported", () => {
  const all = exported.all;
  const byUrl = exported.byUrl;
  it("should be an array of the same length as data", () => {
    assert.isArray(all);
    assert.equal(all.length, data.length);
  });
  all.forEach((site, i) => {
    describe(`#${i + 1} ${site.title}`, () => {
      it("should have background color as a RGB color", () => {
        assert.property(site, "background_color_rgb");
        assert.isArray(site.background_color_rgb);
        assert.deepEqual(site.background_color_rgb, hexToRgb(site.background_color), `expected ${site.background_color} to equal ${site.background_color_rgb}`)
      });
      it("should exist in byUrl", () => {
        assert.property(byUrl, site.url);
        assert.deepEqual(site, byUrl[site.url]);
      });
    });
  });
});
