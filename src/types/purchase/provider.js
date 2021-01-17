import namespace from "../../utils/namespace.js";

export default namespace("provider", {
  getters: [
    "getValidProvider",
    "getTypeQuery",
    "getProvider",
    "getUpProvider",
    "getActiveProvider",
    "getActivePhone",
    "getListProvider"
  ],
  actions: [
    "addProvider",
    "upProvider",
    "delProvider",
    "viewProvider",
    "resetProvider"
  ],
  mutations: [
    "setTypeQuery",
    "setIdProvider",
    "setProvider",
    "setUpProvider",
    "setActiveProvider",
    "setListProvider"
  ]
});
