# node-sciencedirect [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> A node sdk and client library for sciencedirect api

## Installation

```sh
$ npm install --save node-sciencedirect
```

## Usage

```js
const nodeSciencedirect = require('node-sciencedirect');

let scienceDirect = new ScienceDirect('<YOUR_API_KEY>');

/* Retrieve the newest 10 articles which contains the word 'software'*/
scienceDirect.search('software', 10, {sort: '-coverDate'}, (err, articles)=>{
    // Work with your retrieved results from sciencedirect
    
});

```
## License

MIT © [Haritz Medina](https://haritzmedina.com)


[npm-image]: https://badge.fury.io/js/node-sciencedirect.svg
[npm-url]: https://npmjs.org/package/node-sciencedirect
[travis-image]: https://travis-ci.org/haritzmedina/node-sciencedirect.svg?branch=master
[travis-url]: https://travis-ci.com/haritzmedina/node-sciencedirect
[daviddm-image]: https://david-dm.org/haritzmedina/node-sciencedirect.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/haritzmedina/node-sciencedirect
[coveralls-image]: https://coveralls.io/repos/haritzmedina/node-sciencedirect/badge.svg
[coveralls-url]: https://coveralls.io/r/haritzmedina/node-sciencedirect
