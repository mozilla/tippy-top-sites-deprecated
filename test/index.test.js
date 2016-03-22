const assert = require("chai").assert;
const validator = require("validator");
const data = require("../top_sites.json");

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
      it("should have an image_url pointing to a .png or .svg image", () => {
        assert.property(site, "image_url");
        assert.isString(site.image_url);
        assert.match(site.image_url, /\.(png|svg)$/, `expected ${site.image_url} to be a .png or .svg image`);
      });
      it("should have background color as a hex color which is 4 or 7 characters long", () => {
        var bgcolor = site.background_color;
        assert.property(site, "background_color");
        assert.isString(bgcolor);
        assert.isTrue(validator.isHexColor(bgcolor), `expected ${bgcolor} to be a hex color`)
        assert.isTrue(bgcolor.length === 4 || bgcolor.length === 7, `expected ${bgcolor} to be 4 or 7 chars`);
      });
    });
  });
});
