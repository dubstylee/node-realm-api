const uuid = require("uuid/v4");
const realm = require("./index")[process.env.NODE_ENV];

/**
 * Returns all objects of the given {type} in the Realm database.
 * @param {string} type - The type of objects to retrieve.
 * @param {string|SortDescriptor[]} [sort] - The property name(s) to sort the collection on.
 * @return {Realm.Results} that will live-update as objects are created and destroyed.
 * @throws {Error} If type passed into this method is invalid.
 */
function getAll(type, sort) {
  return realm.objects(type).sorted(sort);
}

/**
 * Searches for a Realm object by its primary key.
 * @param {string} type - The type of Realm object to search for.
 * @param {string} id - The primary key value of the object to search for.
 * @return {Realm.Object} or undefined if no object is found.
 * @throws {Error} If type passed into this method is invalid or if the object type did not have a primaryKey specified in its {ObjectSchema}.
 */
function getObject(type, id) {
  return realm.objectForPrimaryKey(type, id);
}

/**
 * Create a new Realm object of the given type and with the specified properties.
 * @param {string} type - The type of Realm object to create.
 * @param {object} obj - An object containing all properties for the new object.
 * @return {Realm.Object}
 */
function addObject(type, obj) {
  let newObj;

  realm.write(() => {
    if (typeof obj.id === "undefined") {
      // generate new UUID if one is not provided
      obj.id = uuid();
    }
    newObj = realm.create(type, obj);
  });

  return newObj;
}

/**
 * Update an existing Realm object of the given type with the specified properties.
 * @param {string} type - The type of Realm object to update.
 * @param {object} obj - An object containing all properties for the object to be updated.
 * @return {Realm.Object} or {undefined} if the object does not exist.
 */
function updateObject(type, obj) {
  if (!realm.objectForPrimaryKey(type, obj.id)) {
    return null;
  }

  let updatedObj;

  realm.write(() => {
    updatedObj = realm.create(type, obj, true);
  });

  return updatedObj;
}

/**
 * Delete the specified Realm object.
 * @param {object} obj - The Realm object to delete.
 * @return {boolean} true if the item was successfully deleted.
 */
function deleteObject(obj) {
  realm.write(() => {
    realm.delete(obj);
  });

  return true;
}

/**
 * Delete a Realm object of the provided type with the provided primary key.
 * @param {string} type - The type of Realm object to delete.
 * @param {string} id - The primary key of the Realm object to be deleted.
 * @return {boolean} true if the item was successfully deleted, or false if the item was not found.
 */
function deleteObjectById(type, id) {
  if (!realm.objectForPrimaryKey(type, id)) {
    return false;
  }

  return deleteObject(realm.objectForPrimaryKey(type, id));
}

module.exports = {
  getAll,
  getObject,
  addObject,
  updateObject,
  deleteObject,
  deleteObjectById
};
