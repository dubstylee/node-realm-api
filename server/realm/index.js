const Realm = require("realm");
const Schema = require("./schema");

module.exports = new Realm({
  path: "./" + process.env.NODE_ENV + ".realm",
  schema: Schema,
  schemaVersion: 1,
  migration: (oldRealm, newRealm) => {
//    if (oldRealm.schemaVersion < 1) { } // no changes needed
  }
});

