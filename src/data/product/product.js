import knex from "../../utils/connectionDb.js";

export default class product {
  constructor() {
    this.table = "product";
  }
  add(product) {
    return new Promise((resolve, reject) => {
      this.notExist(product.name).then(resp => {
        if (resp) {
          knex
            .transaction(function(trx) {
              return trx
                .insert(
                  {
                    name_product: product.name,
                    id_brand: product.idBrand,
                    id_category: product.idCategory
                  },
                  "id_product"
                )
                .into("product")
                .then(function(id) {
                  return trx("inventary").insert({
                    id_product: id,
                    price_now_sale: 0,
                    stock: 0
                  });
                });
            })
            .then(function(inserts) {
              console.log(inserts.length + " nuevo producto guardado.");
              resolve(true);
            })
            .catch(function(err) {
              console.error(err);
              reject(err);
            });
        } else {
          reject(`El producto ${product.name} ya existe.`);
        }
      });
    });
  }
  update(product) {
    return new Promise((resolve, reject) => {
      this.notExist(product.name).then(resp => {
        if (resp) {
          knex(this.table)
            .where("id_product", "=", product.id)
            .update({
              name_product: product.name,
              id_brand: product.idBrand,
              id_category: product.idCategory
            })
            .catch(err => {
              reject(err);
            })
            .then(() => {
              resolve(true);
            });
        } else {
          reject(`El producto ${product.name} ya existe.`);
        }
      });
    });
  }
  delete(product) {
    return new Promise((resolve, reject) => {
      this.inUse(product.id).then(resp => {
        if (resp == 0) {
          knex(this.table)
            .where("id_product", product.id)
            .del()
            .catch(err => {
              reject(err);
            })
            .then(() => {
              resolve(true);
            });
        } else {
          reject(
            `El producto ${product.name} no se puede eliminar ya que hay ${resp} lotes usándolos.`
          );
        }
      });
    });
  }
  notExist(name) {
    return new Promise((resolve, reject) => {
      knex
        .count("*", { as: "count" })
        .from("product")
        .where("name_product", "=", name)
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
        .from("view_product_aggregates")
        .where("id_product", "=", id)
        .then(dt => {
          resolve(dt[0].count);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  view(search = "") {
    return new Promise((resolve, reject) => {
      knex
        .select("*")
        .from("view_product")
        .where("name", "like", `%${search}%`)
        .then(dt => {
          resolve(dt);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  viewSearch(search = "") {
    return new Promise((resolve, reject) => {
      knex
        .select("*")
        .from("view_product")
        .where("name", "like", `${search}%`)
        .limit(5)
        .then(dt => {
          resolve(dt);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
