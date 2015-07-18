require('babel-core/polyfill'); // makes PhantomJS v1.X work properly

const helpers = require.context('./spec/helpers', true, /\.js$/);
helpers.keys().forEach(helpers);

const specs = require.context('./spec', true, /(_s|S)pec\.js$/);
specs.keys().forEach(specs);
