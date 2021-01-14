import knex from "../../utils/connectionDb.js";

export default class sale {
  constructor() {
    this.table = "sale";
  }
  add(sale) {
    return new Promise((resolve, reject) => {
      let dts = [];
      let nSale = this.formatPurchase(sale);
      knex
        .transaction(trx => {
          return trx
            .insert(nSale, "id_sale")
            .into("sale")
            .then(id => {
              sale.listDt.forEach(dt => {
                dt.idSale = id;
                let newDt = this.formatDt(dt);
                dts.push(newDt);
              });
              return trx("dt_sale").insert(dts);
            });
        })
        .then(function(inserts) {
          console.log(inserts.length + " venta guardada");
          resolve(true);
        })
        .catch(function(err) {
          console.error(err);
          reject(err);
        });
    });
  }
  formatPurchase(sale) {
    return {
      n_reference: sale.code,
      client: sale.client,
      date: sale.date,
      total_sale: sale.total,
      cash: sale.cash,
      change: sale.change
    };
  }
  formatDt(dt) {
    return {
      id_sale: dt.idSale,
      id_product: dt.idProduct,
      price_sale: dt.price,
      quantity_sale: dt.quantity,
      total_dt_sale: dt.total
    };
  }
  listUpdate(sale) {
    let add = [],
      up = [],
      del = [];
    return new Promise((resolve, reject) => {
      if (!!sale) {
        sale.listDt.forEach(element => {
          element.idSale = sale.id;
          if (element.option == "add") {
            add.push(this.formatDt(element));
          } else if (element.option == "up") {
            up.push(element);
          }
        });
        del = sale.listDelDt;
        resolve({ add, up, del });
      } else {
        reject("error no se a proporcionado la venta para realizar la lista");
      }
    });
  }
  update(sale) {
    return new Promise((resolve, reject) => {
      knex("sale")
        .where("id_sale", "=", purchase.id)
        .update(this.formatPurchase(sale))
        .then(() => {
          this.listUpdate(sale).then(({ add, up, del }) => {
            let pAdd = knex("dt_sale").insert(add);
            let pUp = new Promise((res, rej) => {
              up.forEach((item, index) => {
                knex("dt_sale")
                  .where("id_dt_sale", "=", item.id)
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
                knex("dt_sale")
                  .where("id_dt_sale", "=", item.id)
                  .del()
                  .catch(err => {
                    rej("Error al eliminar el detalle");
                  });
                if (index == del.length - 1) {
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
      knex("dt_sale")
        .where("id_sale", "=", id)
        .del()
        .catch(err => {
          reject(err);
        })
        .then(() => {
          knex("sale")
            .where("id_sale", "=", id)
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
  view(query) {
    return new Promise((resolve, reject) => {
      knex
        .select("*")
        .from("view_sale")
        .whereBetween("date", [query.dateIn, query.dateOut])
        .andWhere(query.option, "like", `%${query.search}%`)
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
        .from("view_dt_sale")
        .where("idSale", id)
        .then(resp => {
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
