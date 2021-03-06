const Realm = require("realm");

// Realm supports the following basic types: bool, int, float, double, string, data, and date.
//
// bool properties map to JavaScript boolean values
// int, float, and double properties map to JavaScript number values.
// Internally ‘int’ and ‘double’ are stored as 64 bits while float is stored with 32 bits.
// string properties map to string
// data properties map to ArrayBuffer
// date properties map to Date

const AddressSchema = {
  name: "Address",
  primaryKey: "id",
  properties: {
    id: { type: "string" },
    addressName: "string",
    street1: "string",
    street2: "string",
    city: "string",
    state: "string",
    zip: "string",
    notes: "string"
    // formatted: address info
  }
};

const CompanySchema = {
  name: "Company",
  primaryKey: "id",
  properties: {
    id: { type: "string" },   // primary key uuid
    companyName: "string",
    // logoBase64: "string?", // store path to image file instead
    notes: "string?",         // encrypt this field
    notesSalt: "string?",     // used for encryption
    contacts: "Contact[]",
    addresses: "Address[]"
  }
};

const ContactSchema = {
  name: "Contact",
  primaryKey: "id",
  properties: {
    id: { type: "string" },
    emailAddress: "string",
    hours: "string",
    contactName: "string",
    notes: "string",
    phoneNumber: "string",
    faxNumber: "string",
    // formatted: contact info
  }
};

module.exports = [
  AddressSchema,
  CompanySchema,
  ContactSchema
];
