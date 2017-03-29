const Sciencedirect = require('../index.js');

const scienceDirectApiKey = process.env.SCIENCEDIRECT_APIKEY || null;

const queryExample = 'software';

describe('nodeSciencedirect', () => {
  it('No APIKey provided', () => {
    expect(() => {
      const scienceDirect = new Sciencedirect(null);
      scienceDirect.search();
    }).toThrow(new Error('ScienceDirect needs an API key to work'));
  });

  it('Search query in science direct', (done) => {
    const scienceDirect = new Sciencedirect(scienceDirectApiKey);
    scienceDirect.search(queryExample, 5, {}, (error, results) => {
      if (error) {
        expect(true).toBe(false);
      } else {
        expect(results.length).toBe(5);
      }
      done();
    });
  });
});
