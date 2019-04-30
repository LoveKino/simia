const {
  startApp
} = require('../src');
const ses = require('./index.json');

startApp(document.getElementById('app'), ses);
