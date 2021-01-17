import namespace from "../../utils/namespace.js";

export default namespace("report", {
  getters: [
    "getPrinter",
    "getListPrinter"
  ],
  actions: [
    "configPrint",
    "viewPrinter",
  ],
  mutations: [
    "setPrinter",
    "setListPrinter",
  ]
});
