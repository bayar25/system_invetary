import knex from "../../utils/connectionDb.js";

export default class category {
  constructor() {
    this.table = "category";
  }
  add(name) {
    return new Promise((resolve, reject) => {
      this.notExist(name).then(resp => {
        if (resp && !!name) {
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
        } else {
          reject(`La categoría ${name} ya existe.`);
        }
      });
    });
  }
  update(category) {
    return new Promise((resolve, reject) => {
      this.notExist(category.name).then(resp => {
        if (resp && !!category.name) {
          knex(this.table)
            .where("id_category", "=", category.id)
            .update("name_category", category.name)
            .catch(err => {
              reject(err);
            })
            .then(() => {
              resolve(true);
            });
        } else {
          reject(`La categoría ${name} ya existe.`);
        }
      });
    });
  }
  delete(category) {
    return new Promise((resolve, reject) => {
      this.inUse(category.id).then(resp => {
        if (resp == 0) {
          knex(this.table)
            .where("name_category", category.name)
            .del()
            .catch(err => {
              reject(err);
            })
            .then(() => {
              resolve(true);
            });
        } else {
          reject(
            `La categoría ${category.name} no se puede eliminar ya que hay ${resp} un producto usándola.`
          );
        }
      });
    });
  }
  notExist(name) {
    return new Promise((resolve, reject) => {
      knex
        .count("*", { as: "count" })
        .from(this.table)
        .where("name_category", "=", name)
        .then(dt => {
          if (dt[0].count == 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  inUse(id) {
    return new Promise((resolve, reject) => {
      knex
        .count("*", { as: "count" })
        .from("product")
        .where("id_category", "=", id)
        .then(dt => {
          resolve(dt[0].count);
        })
        .catch(err => {
          reject(err);
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
