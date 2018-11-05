const uuid = require("uuid/v4");
const realm = require("./index")[process.env.NODE_ENV];

function getAllCompanies() {
  return realm.objects("Company").sorted("companyName");
}

function getCompany(id) {
  return realm.objectForPrimaryKey("Company", id);
}

function addCompany(company) {
  let newCompany;

  try {
    realm.write(() => {
      if (typeof company.id === "undefined") {
        // generate new UUID if one is not provided
        company.id = uuid();
      }
      newCompany = realm.create("Company", company);
    });
  } catch (err) {
    newCompany = { id: "error", companyName: "error", notes: err.message };
  }

  return newCompany;
}

function updateCompany(id, company) {
  if (!realm.objectForPrimaryKey("Company", id)) {
    return null;
  }

  let updatedCompany;

  realm.write(() => {
    updatedCompany = realm.create("Company",
        { id:          company.id,
          companyName: company.companyName,
          notes:       company.notes,
          notesSalt:   company.notesSalt }, true);
  });

  return updatedCompany;
}

function deleteCompany(id) {
  if (!realm.objectForPrimaryKey("Company", id)) {
    return null;
  }

  realm.write(() => {
    realm.delete(realm.objectForPrimaryKey("Company", id));
  });

  return id;
}

module.exports = {
  getAllCompanies,
  getCompany,
  addCompany,
  updateCompany,
  deleteCompany
};
