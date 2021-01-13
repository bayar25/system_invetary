import knex from "../../utils/connectionDb.js";

export default class provider {
  constructor() {
    this.table = "provider";
  }
  add(provider) {
    return new Promise((resolve, reject) => {
      this.exist(provider.name)
        .then(resp => {
          if (!resp) {
            knex(this.table)
              .insert({
                name_provider: provider.name,
                phone_provider: provider.phone
              })
              .catch(err => {
                reject(err);
              })
              .then(() => {
                resolve(true);
              });
          } else {
            reject("El provedor que esta tratando de agregar ya existe.");
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  update(provider) {
    return new Promise((resolve, reject) => {
      knex(this.table)
        .where("id_provider", "=", provider.id)
        .update({
          name_provider: provider.name,
          phone_provider: provider.phone
        })
        .catch(err => {
          reject(err);
        })
        .then(() => {
          resolve(true);
        });
    });
  }
  delete(provider) {
    console.log(name);
    return new Promise((resolve, reject) => {
      knex(this.table)
        .where("name_provider", provider.name)
        .del()
        .catch(err => {
          reject(err);
        })
        .then(() => {
          resolve(true);
        });
    });
  }

  exist(name) {
    return new Promise((resolve, reject) => {
      knex
        .count({ count: "*" })
        .from(this.table)
        .where("name_provider", "=", name)
        .then(dt => {
          if (dt[0].count > 0){ resolve(true)}
          else {resolve(false)}
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  view() {
    return new Promise((resolve, reject) => {
      knex
        .select(
          "id_provider as id",
          "name_provider as name",
          "phone_provider as phone"
        )
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
