const ScienceDirect = require('./lib/index.js');

const scienceDirectApiKey = process.env.SCIENCEDIRECT_APIKEY || null;
const queryExample = 'conversational agent';

const scienceDirect = new ScienceDirect(scienceDirectApiKey);

scienceDirect.search(queryExample, 1, {sort: '-coverDate'}, (err, result) => {
  if (err) {
    console.log(err);
  } else {
    result.forEach(article => {
      console.log(article['dc:title'] + ' https://dx.doi.org/' + article['prism:doi']);
    });
  }
});
