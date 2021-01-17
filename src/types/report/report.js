import namespace from "../../utils/namespace.js";

export default namespace("report", {
  getters: [
    "getValidReport",
    "getUserGenerate",
    "getUserCharge",
    "getTypeReport",
    "getReport",
    "getDataReport",
    "getDateIn",
    "getDateOut",
  ],
  actions: [
    "GenerateReport",
    "SaveReport",
    "PrintReport",
  ],
  mutations: [
    "setResetReport",
    "setUserGenerate",
    "setUserCharge",
    "setTypeReport",
    "setReport",
    "setDataReport",
    "setDateIn",
    "setDateOut",
  ]
});
