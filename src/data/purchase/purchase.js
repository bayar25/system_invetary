import knex from "../../utils/connectionDb.js";

export default class purchase {
  constructor() {
    this.table = "purchase";
  }
  add(purchase) {
    return new Promise((resolve, reject) => {
      let dts = [];
      knex
        .transaction(function(trx) {
          return trx
            .insert(this.formatPurchase(purchase), "id_purchase")
            .into("purchase")
            .then(function(id) {
              purchase.listDt.forEach(dt => {
                dt.idPurchase = id;
                let newDt = this.formatDt(dt);
                dts.push(newDt);
              });
              return trx("dt_purchase").insert(dts);
            });
        })
        .then(function(inserts) {
          console.log(inserts.length + " new books saved.");
          resolve(true);
        })
        .catch(function(err) {
          console.error(err);
          reject(err);
        });
    });
  }
  formatPurchase(purchase) {
    return {
      date: purchase.date,
      total_purchase: purchase.total,
      id_provider: purchase.idProvider
    };
  }
  formatDt(dt) {
    return {
      id_purchase: dt.idPurchase,
      id_product: dt.idProduct,
      price_purchase: dt.pricePurchase,
      price_sale: dt.priceSale,
      quantity: dt.quantity,
      total_dt_purchase: dt.total
    };
  }
  listUpdate(purchase) {
    let add = [],
      up = [],
      del = [];
    return new Promise((resolve, reject) => {
      if (!!purchase) {
        purchase.listDt.forEach(element => {
          element.idPurchase = purchase.id;
          if (element.option == "add") {
            add.push(this.formatDt(element));
          } else if (element.option == "up") {
            up.push(element);
          }
        });
        del = purchase.listDelDt;
        resolve({ add, up, del });
      } else {
        reject("error no se a proporcionado compra para realizar la lista");
      }
    });
  }
  update(purchase) {
    return new Promise((resolve, reject) => {
      knex(this.table)
        .where("id_purchase", "=", purchase.id)
        .update({
          code: purchase.code,
          total_purchase: purchase.total,
          id_provider: purchase.idProvider
        })
        .then(() => {
          this.listUpdate(purchase).then(({ add, up, del }) => {
            let pAdd = knex("dt_purchase").insert(add);
            let pUp = new Promise((res, rej) => {
              up.forEach((item, index) => {
                knex("dt_purchase")
                  .where("id_dt_purchase", "=", item.id)
                  .update(this.formatDt(item))
                  .catch(err => {
                    rej("Error al  actualizar el detalle");
                  });
                if (index == up.length - 1) {
                  res(true);
                }
              });
            });
            let pDel = new Promise((res, rej) => {
              del.forEach((item, index) => {
                knex("dt_purchase")
                  .where("id_dt_purchase", "=", item.id)
                  .del()
                  .catch(err => {
                    rej("Error al eliminar el detalle");
                  });
                if (index == up.length - 1) {
                  res(true);
                }
              });
            });
            Promise.all([pAdd, pUp, pDel])
              .then(() => {
                resolve(true);
              })
              .catch(err => {
                reject(err);
              });
          });
        });
    });
  }
  del(id) {
    return new Promise((resolve, reject) => {
      knex("dt_purchase")
        .where("id_purchase", "=", id)
        .del()
        .catch(err => {
          reject(err);
        })
        .then(() => {
          knex(this.table)
            .where("id_purchase", "=", id)
            .del()
            .catch(err => {
              reject(err);
            })
            .then(() => {
              resolve(true);
            });
        });
    });
  }
  view(purchase) {
    return new Promise((resolve, reject) => {
      knex
        .select("*")
        .from("view_purchase")
        .whereBetween("date", [purchase.dateIn, purchase.dateOut])
        .andWhere("idProvider", purchase.idProvider)
        .then(resp => {
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  viewDt(id) {
    return new Promise((resolve, reject) => {
      knex
        .select("*")
        .from("view_dt_purchase")
        .where("idPurchase",id)
        .then(resp => {
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
