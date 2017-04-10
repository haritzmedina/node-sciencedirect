'use strict';

const request = require('request');

class ScienceDirect {

  /**
   * ScienceDirect module constructor
   * @param apiKey ScienceDirect API Key. Create an API Key here: https://dev.elsevier.com/apikey/manage
   */
  constructor(apiKey) {
    if (apiKey === null || typeof apiKey !== 'string') {
      throw new Error('ScienceDirect needs an API key to work');
    } else {
      this.apiKey = apiKey;
    }
  }

  /**
   * Search in sciencedirect and retrieve the papers which matches the query
   * @param queryString The query string used in sciencedirect https://api.elsevier.com/documentation/search/SCIDIRSearchTips.htm
   * @param numberOfResults Number of results to be retrieved ('ALL' to retrieve all posible results or as much as API admit)
   * @param opts Other options of search API: https://api.elsevier.com/documentation/SCIDIRSearchAPI.wadl
   * @param callback The callback function to call after the query
   */
  search(queryString, numberOfResults, opts, callback) {
    const options = opts;
    options.query = queryString;
    if (numberOfResults < 100 && numberOfResults > 0) {
      options.count = numberOfResults;
    } else {
      options.count = 100;
    }
    if (numberOfResults === null) {
      numberOfResults = Number.MAX_SAFE_INTEGER;
    }

    this.request(options, (err, result) => {
      if (err) {
        callback(err);
      } else {
        const resultsNumber = parseInt(result['search-results']['opensearch:totalResults'], 10);
        if (numberOfResults < resultsNumber) {
          callback(null, result['search-results'].entry);
        } else {
          let queryResults = [];
          queryResults = queryResults.concat(result['search-results'].entry);
          // Continue retrieving results till numberOfResults is reached
          this.searchNextResults(options, queryResults, 100, resultsNumber, callback);
        }
      }
    });
  }

  searchNumberOfTotalResults(queryString, callback) {
    const options = {query: queryString};
    this.request(options, (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, parseInt(result['search-results']['opensearch:totalResults'], 10));
      }
    });
  }

  searchNextResults(opts, arrayResults, index, maxIndex, callback) {
    if (index >= maxIndex) {
      callback(null, arrayResults);
    } else {
      opts.start = index;
      opts.count = 100;
      this.request(opts, (err, result) => {
        if (err) {
          callback(err, arrayResults);
        } else {
          arrayResults = arrayResults.concat(result['search-results'].entry);
          this.searchNextResults(opts, arrayResults, index + 100, maxIndex, callback);
        }
      });
    }
  }

  request(apiOptions, callback) {
    // Set default api options fot the sdk
    apiOptions.apiKey = this.apiKey;
    apiOptions.httpAccept = 'application/json';
    request({
      url: 'http://api.elsevier.com/content/search/scidir',
      method: 'GET',
      qs: apiOptions
    }, (error, response, body) => {
      if (error) {
        callback(error);
      } else {
        const searchResult = JSON.parse(body);
        callback(null, searchResult);
      }
    });
  }

}

module.exports = ScienceDirect;
