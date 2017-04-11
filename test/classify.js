const classifier = require('../src/index.js');

const options = {
  bingApiString: '',
};

classifier.classify('Cherry', options)
.then((color) => {
  console.log(`Term color: ${color}`);
})
.catch((err) => {
  console.error(err);
});
