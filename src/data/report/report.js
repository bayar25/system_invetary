import db from "../../utils/connectionDbDirect.js";

export default class report {
  viewHistoryPurchase(query) {
    return new Promise((resolve, reject) => {
      db.query(
        `select
        product,
        pricePurchase,
        priceSale,
        sum(quantityPurchase) as 'quantityPurchase',
        sum(totalDtPurchase) as 'totalDtPurchase'
        from view_history_purchase
        where view_history_purchase.datePurchase between CAST('${query.dateIn}'as DATE) and CAST('${query.dateOut}'as DATE)
        group by product, pricePurchase, priceSale;`,
        function(error, results, fields) {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  }
  viewHistorySale(query) {
    return new Promise((resolve, reject) => {
      db.query(
        `select
        product,
        priceSale,
        sum(quantitySale) as 'quantitySale',
        sum(totalDtSale) as 'totalDtSale'
        from view_history_sale
        where view_history_sale.dateSale between CAST('${query.dateIn}'as DATE) and CAST('${query.dateOut}'as DATE)
        group by product, priceSale;`,
        function(error, results, fields) {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  }
  viewCostSaleProduct(query) {
    return new Promise((resolve, reject) => {
      db.query(
        `select product,
pricePurchase,
priceSale,
sum(quantityPurchase) as 'quantityPurchase',
sum(quantitySale) as 'quantitySale',
sum(stock) as 'stock',
sum(totalDtPurchase) as 'totalDtPurchase',
sum(totalDtSale) as 'totalDtSale',
(sum(stock)*quantitySale) as 'totalInventary'
from view_cost_sale_product
where view_cost_sale_product.datePurchase between CAST('${query.dateIn}'as DATE) and CAST('${query.dateOut}'as DATE)
and view_cost_sale_product.dateSale between CAST('${query.dateIn}'as DATE) and CAST('${query.dateOut}'as DATE)
group by product, priceSale;`,
        function(error, results, fields) {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  }
}
