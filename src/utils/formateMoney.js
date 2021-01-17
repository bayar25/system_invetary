export const formatMoney = value => {
  let formatCord = new Intl.NumberFormat("es-US", {
    style: "currency",
    currency: "USD"
  });
  return "C" +  formatCord.format(value);
};
