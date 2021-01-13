import knex from "../../utils/connectionDb.js";

export default class category {
  constructor() {
    this.table = "category";
  }
  add(name) {
    return new Promise((resolve, reject) => {
      knex(this.table)
        .insert({
          name_category: name
        })
        .catch(err => {
          reject(err);
        })
        .then(() => {
          resolve(true);
        });
    });
  }
  update(category) {
    return new Promise((resolve, reject) => {
      knex(this.table)
        .where("id_category", "=", category.id)
        .update("name_category", category.name)
        .catch(err => {
          reject(err);
        })
        .then(() => {
          resolve(true);
        });
    });
  }
  delete(name) {
    return new Promise((resolve, reject) => {
      knex(this.table)
        .where("name_category", name)
        .del()
        .catch(err => {
          reject(err);
        })
        .then(() => {
          resolve(true);
        });
    });
  }
  view() {
    return new Promise((resolve, reject) => {
      knex
        .select("id_category as id", "name_category as name")
        .from(this.table)
        .then(dt => {
          resolve(dt);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
