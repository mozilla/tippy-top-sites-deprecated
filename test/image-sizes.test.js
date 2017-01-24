const fs = require("fs");
const assert = require("chai").assert;
const path = require("path");
const sizeOf = require("image-size");
const data = require("../top_sites.json");
const IMAGE_SIZE = require("../index").IMAGE_SIZE;

const IMAGE_DIR = "images";

const imagesInFolder = fs.readdirSync(IMAGE_DIR).filter(filename => filename.match(/\.(png|svg)$/));
const imagesInJson = data.map(site => site.image_url);

function inFirstButNotInSecond(first, second) {
  return first.filter(item => second.indexOf(item) < 0);
}

describe("inFirstButNotInSecond", () => {
  it("should return extra items in the first array", () => {
    const A = [1, 2, 3, 4];
    const B = [3, 1, 2];
    assert.deepEqual(inFirstButNotInSecond(A, B), [4]);
  });
  it("should not return extra items in the second array", () => {
    const A = [1, 2, 3];
    const B = [3, 1, 2, 4];
    assert.deepEqual(inFirstButNotInSecond(A, B), []);
  });
});

describe("images/", () => {
  it("should every file defined in top_sites.json", () => {
    const missing = inFirstButNotInSecond(imagesInJson, imagesInFolder);
    if (missing.length) {
      throw new Error(`[${missing.join(", ")}] were defined in top_sites.json but they were not found in the images/ folder`);
    }
  });
  it("should not have unused images", () => {
    const extra = inFirstButNotInSecond(imagesInFolder, imagesInJson);
    if (extra.length) {
      throw new Error(`[${extra.join(", ")}] were found in the images/ folder but they were not defined in top_sites.json`);
    }
  });
  data.forEach(site => {
    it(`should have an image with the correct width and height for ${site.title}`, () => {
      const stats = sizeOf(path.join(IMAGE_DIR, site.image_url));
      assert.equal(stats.width, IMAGE_SIZE, "width");
      assert.equal(stats.height, IMAGE_SIZE, "height");
    });
  });
});
