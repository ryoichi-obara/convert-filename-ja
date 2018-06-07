# convert-filename-ja

[![Build Status](https://travis-ci.org/ryoichi-obara/convert-filename-ja.svg?branch=master)](https://travis-ci.org/ryoichi-obara/convert-filename-ja)
[![Coverage Status](https://coveralls.io/repos/github/ryoichi-obara/convert-filename-ja/badge.svg?branch=master)](https://coveralls.io/github/ryoichi-obara/convert-filename-ja?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/7161b91f3cc9ff507c7c/maintainability)](https://codeclimate.com/github/ryoichi-obara/convert-filename-ja/maintainability)
[![npm version](https://badge.fury.io/js/convert-filename-ja.svg)](https://badge.fury.io/js/convert-filename-ja)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

Convert a string to be able to use as a filename with Japanese characters.

## Install

```
npm install convert-filename-ja
```

## Usage

``convert`` returns a string to safe use for filename.

* Remove control characters (0x00–0x1f and 0x80–0x9f)
* Remove reserved filenames on UNIX/Windows
  - '.'
  - '..'
  - 'con', 'prn', 'aux', 'nul'
  - 'com1', 'com2', 'com3', 'com4', 'com5', 'com6', 'com7', 'com8', 'com9'
  - 'lpt1', 'lpt2', 'lpt3', 'lpt4', 'lpt5', 'lpt6', 'lpt7', 'lpt8', 'lpt9'
  - Remove prefix space and suffix space and dot
* Convert reserved characters ( / ? < > ¥ \ : * | " ) to Japanese double byte characters.
* Remove characters over 255

```js
const converter = require('convert-filename-ja');

const parentDir         = converter.convert('..'); // ''
const convertDoublebyte = converter.convert('filename<2018/06/08>.txt.'); // 'filename＜2018／06／08＞.txt'
const nonProcessed      = converter.convert('filenme.txt'); // 'filename.txt'
```

## Refer

https://github.com/parshap/node-sanitize-filename
