import namespace from "../../utils/namespace.js";

export default namespace("Sale", {
  getters: [
    "validSale",
    "getIdSale",
    "getCode",
    "getClient",
    "getDate",
    "getTotal",
    "getCash",
    "getChange",
    "getListDt",
    "getListSale",
    "getViewSearch",
    "getViewOption",
    "getDateIn",
    "getDateOut",
    "getOption"
  ],
  actions: [
    "addSale",
    "upSale",
    "delSale",
    "ChangeDtSale",
    "viewSale",
    "viewDtSale",
    "reportSale"
  ],
  mutations: [
    "setIdSale",
    "setCode",
    "setClient",
    "setDate",
    "setTotal",
    "setCash",
    "setChange",
    "setReset",
    "setListDt",
    "setListDelDt",
    "setListSale",
    "setViewSearch",
    "setViewOption",
    "setDateIn",
    "setDateOut",
    "setOption"
  ]
});
