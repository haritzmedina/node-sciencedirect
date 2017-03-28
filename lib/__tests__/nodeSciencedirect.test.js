const assert = require('assert');
const Sciencedirect = require('../index.js');

describe('nodeSciencedirect', function () {
  it('has a test', function () {
    let scienceDirect = new Sciencedirect();
    scienceDirect.search('Chatbots', (err, result) => {
      if (err) {
        console.log(err);
        assert(false, 'Not able to find');
      } else {
        console.log(result);
        assert(true);
      }
    });
  });

  it('No APIKey provided', ()=>{

  })
});
