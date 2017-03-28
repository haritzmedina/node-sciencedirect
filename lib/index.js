'use strict';

const request = require('request');

class ScienceDirect {

  /**
   * ScienceDirect module constructor
   * @param apiKey ScienceDirect API Key. Create an API Key here: https://dev.elsevier.com/apikey/manage
   */
  constructor(apiKey) {
    if (apiKey === null && apiKey) {
      throw 'ScienceDirect needs an API key to work';
    } else {
      this.apiKey = apiKey;
    }
  }

  /**
   * Search in sciencedirect and retrieve the papers which matches the query
   * @param queryString The query string used in sciencedirect https://api.elsevier.com/documentation/search/SCIDIRSearchTips.htm
   * @param callback The callback function to call after the query
   */
  search(queryString, callback) {
    request({
      url: 'http://api.elsevier.com/content/search/scidir',
      method: 'GET',
      qs: {
        apiKey: this.apiKey,
        query: queryString,
        httpAccept: 'application/json'
      }
    }, (error, response, body) => {
      console.log(response);
      let searchResult = JSON.parse(body);
      callback(searchResult);
    });
  }
}

module.exports = ScienceDirect;
