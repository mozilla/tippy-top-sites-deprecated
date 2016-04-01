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
npm start   Runs a preview server at http://localhost:8080
npm test    Runs tests.
```

## Tagging a release

In order to release, you must have access to publish to the [npm package](https://www.npmjs.com/package/tippy-top-sites). File an issue and ping @k88hudson if you would like to have publish access.

To tag a release, you must run `npm version [type]`, where `[type]` is one of `patch`, `minor`, or `major`. This will bump the version number in `package.json`, create a tag, publish it to npm, and push the tag to github.
