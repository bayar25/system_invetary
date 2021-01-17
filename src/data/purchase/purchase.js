import knex from "../../utils/connectionDb.js";

export default class purchase {
  constructor() {
    this.table = "purchase";
  }
  add(purchase) {
    return new Promise((resolve, reject) => {
      this.insertPurchase(purchase)
        .then(newPurchase => {
          return this.insertLot(purchase.listDt, newPurchase);
        })
        .then(dts => {
          return this.insertDt(dts);
        })
        .then(resp => {
          console.log(resp);
          resolve(resp);
        });
    });
  }

  insertPurchase(purchase) {
    return new Promise((resolve, reject) => {
      knex("purchase")
        .insert(
          {
            date: purchase.date,
            total_purchase: purchase.total,
            id_provider: purchase.idProvider
          },
          "purchase"
        )
        .then(id => {
          resolve({ idPurchase: id[0], date: purchase.date });
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  insertLot(lots, purchase) {
    return new Promise((resolve, reject) => {
      let dts = [];
      let count = 0;
      lots.forEach(lot => {
        knex("lot")
          .insert(
            {
              price_sale: lot.priceSale,
              quantity: lot.quantity,
              date_lot: purchase.date,
              id_inventary: lot.idInventory
            },
            "id_lot"
          )
          .then(id => {
            count++;
            dts.push({
              id_purchase: purchase.idPurchase,
              id_lot: id[0],
              price_purchase: lot.pricePurchase,
              total_dt_purchase: lot.total
            });
            if (count == lots.length) {
              resolve(dts);
            }
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  }

  insertDt(dts) {
    return new Promise((resolve, reject) => {
      let count = 0;
      dts.forEach(dt => {
        knex("dt_purchase")
          .insert(dt)
          .then(() => {
            count++;
            if (count == dts.length) {
              resolve(count);
            }
          })
          .catch(err => {
            reject(err);
          });
      });
    });
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
            add.push(element);
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
      console.log(purchase);
      knex(this.table)
        .where("id_purchase", "=", purchase.id)
        .update({
          code: purchase.code,
          total_purchase: purchase.total,
          id_provider: purchase.idProvider
        })
        .then(() => {
          this.listUpdate(purchase).then(({ add, up, del }) => {
            let addDt = new Promise((res, rej) => {
              if (add.length > 0) {
                this.insertLot(add, purchase)
                  .then(dts => {
                    return this.insertDt(dts);
                  })
                  .then(resp => {
                    res(resp);
                  })
                  .catch(err => {
                    reject(err);
                  });
              }
            });
            let delDt = new Promise((res, rej) => {
              if (del.length > 0) {
                this.delDt(del)
                  .then(() => {
                    return this.delLot(del);
                  })
                  .then(resp => {
                    res(resp);
                  })
                  .catch(err => {
                    reject(err);
                  });
              }
            });
            let upDt = new Promise((res, rej) => {
              if (up.length > 0) {
                Promise.all([this.upLot(up, purchase.date), this.upDt(up)])
                  .then(() => {
                    res(true);
                  })
                  .catch(err => {
                    rej(err);
                  });
              }
            });
            Promise.all([addDt, upDt, delDt])
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

  upDt(dts) {
    return new Promise((resolve, reject) => {
      let count = 0;
      dts.forEach(dt => {
        count++;
        knex("dt_purchase")
          .where("id_dt_purchase", "=", dt.id)
          .update({
            price_purchase: dt.pricePurchase,
            total_dt_purchase: dt.total
          })
          .then(() => {
            if (count == dts.length) {
              resolve(count);
            }
          });
      });
    });
  }

  upLot(lots, date) {
    return new Promise((resolve, reject) => {
      let count = 0;
      lots.forEach(lot => {
        count++;
        knex("lot")
          .where("id_lot", "=", lot.idLot)
          .update({
            price_sale: lot.priceSale,
            quantity: lot.quantity,
            date_lot: date
          })
          .then(() => {
            if (count == dts.length) {
              resolve(count);
            }
          });
      });
    });
  }

  delDt(dts) {
    return new Promise((resolve, reject) => {
      let count = 0;
      dts.forEach(dt => {
        count++;
        knex("dt_purchase")
          .where("id_dt_purchase", "=", dt.id)
          .del()
          .catch(err => {
            reject(err);
          })
          .then(() => {
            if (count == dts.length) {
              resolve(count);
            }
          });
      });
    });
  }
  delLot(lots) {
    return new Promise((resolve, reject) => {
      let count = 0;
      lots.forEach(lot => {
        count++;
        knex("lot")
          .where("id_lot", "=", lot.idLot)
          .del()
          .catch(err => {
            reject(err);
          })
          .then(() => {
            if (count == lots.length) {
              resolve(count);
            }
          });
      });
    });
  }

  del(id) {
    return new Promise((resolve, reject) => {
      let count = 0;
      knex
        .select("*")
        .from("view_del_lote")
        .where("id_purchase", "=", id)
        .then(resp => {
          knex(this.table)
            .where("id_purchase", "=", id)
            .del()
            .catch(err => {
              reject(err);
            })
            .then(() => {
              resp.forEach(element => {
                count++;
                knex("lot")
                  .where("id_lot", "=", element.id_lot)
                  .del()
                  .catch(err => {
                    reject(err);
                  })
                  .then(() => {
                    if (count == resp.length) {
                      resolve(true);
                    }
                  });
              });
            });
        })
        .catch(err => {
          reject(err);
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
        .where("idPurchase", id)
        .then(resp => {
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
