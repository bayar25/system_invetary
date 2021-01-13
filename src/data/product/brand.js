import knex from "../../utils/connectionDb.js";

export default class brand {
  constructor() {
    this.table = "brand";
  }
  add(name) {
    return new Promise((resolve, reject) => {
      knex(this.table)
        .insert({
          name_brand: name
        })
        .catch(err => {
          reject(err);
        })
        .then(() => {
          resolve(true);
        });
    });
  }
  update(brand) {
    return new Promise((resolve, reject) => {
      knex(this.table)
        .where('id_brand','=', brand.id)
        .update('name_brand', brand.name)
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
        .where("name_brand", name)
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
        .select("id_brand as id", "name_brand as name")
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
