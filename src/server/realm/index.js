const Realm = require('realm');
const Schema = require('./schema');

module.exports = {
  test: (() => new Realm({ path: './test.realm', schema: Schema }) ),
  development: (() => new Realm({ path: './default.realm', schema: Schema }) )
};
