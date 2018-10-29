const Realm = require('realm');
const uuid = require('uuid/v4');

// Realm supports the following basic types: bool, int, float, double, string, data, and date.
//
// bool properties map to JavaScript boolean values
// int, float, and double properties map to JavaScript number values.
// Internally ‘int’ and ‘double’ are stored as 64 bits while float is stored with 32 bits.
// string properties map to string
// data properties map to ArrayBuffer
// date properties map to Date

const CompanySchema = {
  name: "Company",
  primaryKey: "id",
  properties: {
    id: { type: "string", default: uuid() }, // primary key uuid
    companyName: "string",
    // logoBase64: "string?", // store path to image file instead
    notes: "string?", // encrypt this field
    notesSalt: "string?" // used for encryption
    //contacts: "Contact[]",
    //addresses: "Address[]"
  }
};

module.exports = [ CompanySchema ];
