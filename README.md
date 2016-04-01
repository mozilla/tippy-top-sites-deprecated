# Tippy Top Sites

[![Build Status](https://travis-ci.org/nchapman/tippy-top-sites.svg?branch=master)](https://travis-ci.org/nchapman/tippy-top-sites)

This repo is meant to provide a hand curated set of icons, colors, and titles for use in [Activity Stream](https://github.com/mozilla/activity-streams). It is meant as a temporary solution to ugly data. We should do something much better very soon.

## Usage

```
npm install tippy-top-sites
```

## Setup

You must first install dependencies with `npm install`.

## Commands

```
npm start           Runs a preview server at http://localhost:8080
npm test            Runs tests.
npm version [type]  Create a tag for release
```

## Tagging a release

In order to create a release, you must create a tag by running:

```
npm version [type]
```

Where `[type]` is one of `patch`, `minor`, or `major`. This will run tests, bump the version number in `package.json`, and push the tag to GitHub.

When this is done, travis will automatically publish the new version to npm.
