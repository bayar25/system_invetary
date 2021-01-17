export const formatDate = (date, option = "default") => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  if (option == "normal") {
    return [day, month, year].join("/");
  }
  return [year, month, day].join("-");
};
