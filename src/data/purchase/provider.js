import knex from "../../utils/connectionDb.js";

export default class provider {
  constructor() {
    this.table = "provider";
  }
  add(provider) {
    return new Promise((resolve, reject) => {
      this.notExist(provider.name)
        .then(resp => {
          if (resp) {
            knex(this.table)
              .insert({
                name_provider: provider.name
              })
              .catch(err => {
                reject(err);
              })
              .then(() => {
                resolve(true);
              });
          } else {
            reject(`El proveedor ${provider.name} ya existe.`);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  update(provider) {
    return new Promise((resolve, reject) => {
      this.notExist(provider.name).then(resp => {
        if (resp) {
          knex(this.table)
            .where("id_provider", "=", provider.id)
            .update({
              name_provider: provider.name
            })
            .catch(err => {
              reject(err);
            })
            .then(() => {
              resolve(true);
            });
        } else {
          reject(`El proveedor ${provider.name} ya existe.`);
        }
      });
    });
  }
  delete(provider) {
    return new Promise((resolve, reject) => {
      this.inUse(provider.id).then(resp => {
        if (resp == 0) {
          knex(this.table)
            .where("name_provider", provider.name)
            .del()
            .catch(err => {
              reject(err);
            })
            .then(() => {
              resolve(true);
            });
        } else {
          reject(
            `El proveedor ${provider.name} no se puede eliminar ya que hay ${resp} compras almacenadas con su nombre.`
          );
        }
      });
    });
  }
  notExist(name) {
    return new Promise((resolve, reject) => {
      knex
        .count("*", { as: "count" })
        .from("provider")
        .where("name_provider", "=", name)
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
        .from("purchase")
        .where("id_provider", "=", id)
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
        .select("id_provider as id", "name_provider as name")
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
