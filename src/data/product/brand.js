import knex from "../../utils/connectionDb.js";

export default class brand {
  constructor() {
    this.table = "brand";
  }
  add(name) {
    return new Promise((resolve, reject) => {
      this.notExist(name).then(resp => {
        if (resp && !!name) {
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
        } else {
          reject(`La marca ${name} ya existe.`);
        }
      });
    });
  }
  update(brand) {
    return new Promise((resolve, reject) => {
      this.notExist(brand.name).then(resp => {
        if (resp && !!brand.name) {
          knex(this.table)
            .where("id_brand", "=", brand.id)
            .update("name_brand", brand.name)
            .catch(err => {
              reject(err);
            })
            .then(() => {
              resolve(true);
            });
        } else {
          reject(`La marca ${name} ya existe.`);
        }
      });
    });
  }
  delete(brand) {
    return new Promise((resolve, reject) => {
      this.inUse(brand.id).then(resp => {
        if (resp == 0) {
          knex(this.table)
            .where("name_brand", brand.name)
            .del()
            .catch(err => {
              reject(err);
            })
            .then(() => {
              resolve(true);
            });
        } else {
          reject(
            `La marca ${brand.name} no se puede eliminar ya que hay ${resp} un producto usándola.`
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
        .where("name_brand", "=", name)
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
        .where("id_brand", "=", id)
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
