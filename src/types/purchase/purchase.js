import namespace from "../../utils/namespace.js";

export default namespace("purchase", {
  getters: [
    "getIdPurchase",
    "getIdProvider",
    "getDate",
    "getTotal",
    "getListDt",
    "getListPurchase",
    "getViewIdProvider",
    "getDateIn",
    "getDateOut",
    "getOption"
  ],
  actions: [
    "addPurchase",
    "upPurchase",
    "delPurchase",
    "ChangeDtPurchase",
    "viewPurchase",
    "viewDtPurchase",
    "validPurchase"
  ],
  mutations: [
    "setIdPurchase",
    "setIdProvider",
    "setDate",
    "setTotal",
    "setReset",
    "setListDt",
    "setListDelDt",
    "setListPurchase",
    "setViewIdProvider",
    "setDateIn",
    "setDateOut",
    "setOption"
  ]
});
