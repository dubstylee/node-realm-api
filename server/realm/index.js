const Realm = require("realm");
const Schema = require("./schema");
const Migration = require("./migrations");

module.exports = new Realm({
  path: "./" + process.env.NODE_ENV + ".realm",
  schema: Schema,
  schemaVersion: 2,
  migration: Migration
});

