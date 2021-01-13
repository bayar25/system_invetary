import namespace from "../../utils/namespace.js";

export default namespace("purchase", {
  getters: [
    'validPurchase',
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
