import knex from "../../utils/connectionDb.js";

export default class product {
  constructor() {
    this.table = "product";
  }
  add(product) {
    return new Promise((resolve, reject) => {
      knex(this.table)
        .insert({
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
    });
  }
  update(product) {
    return new Promise((resolve, reject) => {
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
    });
  }
  delete(id) {
    return new Promise((resolve, reject) => {
      knex(this.table)
        .where("id_product", id)
        .del()
        .catch(err => {
          reject(err);
        })
        .then(() => {
          resolve(true);
        });
    });
  }
  view(search = "") {
    return new Promise((resolve, reject) => {
      knex
        .select('*')
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
        .select('*')
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
