"use strict";

const { assert } = require("chai");
const hexToRgb = require("hex-to-rgb");
const validator = require("validator");
const data = require("../top_sites.json");
const { getSiteData, sites } = require("../index");

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
      it("should have a non-empty domain", () => {
        assert.property(site, "domain");
        assert.ok(site.domain);
        assert.isString(site.domain);
      });
      it("should have a valid url", () => {
        assert.ok("url" in site || "urls" in site);
        if ("url" in site) {
          assert.property(site, "url");
          assert.isString(site.url);
          assert.isTrue(validator.isURL(site.url, {require_protocol: true}), `expected ${site.url} to be a valid url`);
        }
        if ("urls" in site) {
          assert.isArray(site.urls);
          for (let url of site.urls) {
            assert.isString(url);
            assert.isTrue(validator.isURL(url, {require_protocol: true}), `expected ${url} to be a valid url`);
          }
        }
      });
      it("should have an image_url pointing to a .png or .svg image prefixed with images/", () => {
        assert.property(site, "image_url");
        assert.isString(site.image_url);
        assert.match(site.image_url, /\.(png|svg)$/, `expected ${site.image_url} to be a .png or .svg image`);
      });
      it("should have background color as a hex color", () => {
        assert.property(site, "background_color");
        assert.isString(site.background_color);
        assert.isTrue(validator.isHexColor(site.background_color), `expected ${site.background_color} to be a hex color`);
      });
    });
  });
});

describe("sites", () => {
  it("should be an array of the same length as data", () => {
    assert.isArray(sites);
    assert.equal(sites.length, data.length);
  });

  sites.forEach((site) => {
    it("should have background color as a RGB color", () => {
      assert.property(site, "background_color_rgb");
      assert.isArray(site.background_color_rgb);
      assert.deepEqual(site.background_color_rgb, hexToRgb(site.background_color), `expected ${site.background_color} to equal ${site.background_color_rgb}`);
    });
  });
});

describe("getSiteData", () => {
  it("should be a function", () => {
    assert.isFunction(getSiteData);
  });
  it("should return site data for sites with multiple urls", () => {
    const data = sites.find(x => x.title === "amazon");
    assert.ok(data, "Should have sites with title amazon");
    assert.equal(getSiteData("https://amazon.com"), data);
    assert.equal(getSiteData("http://amazon.com"), data);
    assert.equal(getSiteData("https://amazon.com/foo"), data);
    assert.equal(getSiteData("https://amazon.fr"), data);
    assert.equal(getSiteData("https://www.amazon.de/"), data);
    assert.equal(getSiteData("https://www.amazon.co.uk/"), data);
  });
  it("should return site data for sites with a single url", () => {
    const data = sites.find(x => x.title === "facebook");
    assert.ok(data, "Should have sites with title facebook");
    assert.equal(getSiteData("https://facebook.com"), data);
    assert.equal(getSiteData("http://facebook.com"), data);
    assert.equal(getSiteData("https://facebook.com/article"), data);
  });
});
