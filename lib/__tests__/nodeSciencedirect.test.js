const Sciencedirect = require('../index.js');

const scienceDirectApiKey = process.env.SCIENCEDIRECT_APIKEY || null;

const queryExample = 'TITLE-ABSTR-KEY(((%22product%20lines%22%20OR%20%22product%20families%22%20OR%20%22product%20family%22%20OR%20%22product-lines%22%20OR%20%22product-families%22%20OR%20%22product-family%22)%20AND%20(%22evolution%22%20OR%20%22evolving%22%20OR%20%22maintenance%22%20OR%20%22maintaining%22)))';

describe('nodeSciencedirect', () => {
  it('No APIKey provided', () => {
    expect(() => {
      const scienceDirect = new Sciencedirect(null);
      scienceDirect.search();
    }).toThrow(new Error('ScienceDirect needs an API key to work'));
  });

  it('Search Software in science direct', () => {
    const scienceDirect = new Sciencedirect(scienceDirectApiKey);
    scienceDirect.search(queryExample, null, {}, (error, results) => {
      if (error) {
        expect(true).toBe(false);
      } else {
        console.log(results);
      }
    });
  });
});
