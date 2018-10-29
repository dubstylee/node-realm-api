const realm = require('./index');

function getAllCompanies() {
  return realm.objects('Company').sorted('companyName', true);
}

//function getSingleMovie(id) {
//  return knex('movies')
//  .select('*')
//  .where({ id: parseInt(id) });
//}

// function addCompany(company) {
//   try {
//   let companyName = company['companyName'];
//
//   realm.write(() => {
//     realm.create('Company', { companyName: companyName });
//   });
//   } catch (e) {
//     console.log("error");
//   }
//
//   return realm.objects('Company').sorted('companyName', true);
// }

//function updateMovie(id, movie) {
//  return knex('movies')
//  .update(movie)
//  .where({ id: parseInt(id) })
//  .returning('*');
//}

//function deleteMovie(id) {
//  return knex('movies')
//  .del()
//  .where({ id: parseInt(id) })
//  .returning('*');
//}

module.exports = {
  getAllCompanies
//  getSingleMovie,
//  addMovie,
//  updateMovie,
//  deleteMovie
};
