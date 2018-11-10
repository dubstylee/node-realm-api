const uuid = require("uuid/v4");
const db = require("./db");

function getAllCompanies() {
  return db.getAll("Company", "companyName");
}

function getCompany(id) {
  return db.getObject("Company", id);
}

function addCompany(company) {
  return db.addObject("Company", company);
}

function updateCompany(company) {
  return db.updateObject("Company", company);
}

function deleteCompany(id) {
  return db.deleteObjectById("Company", id);
}

module.exports = {
  getAllCompanies,
  getCompany,
  addCompany,
  updateCompany,
  deleteCompany
};
