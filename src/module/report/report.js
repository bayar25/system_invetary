import types from "../../types/report/report.js";
import dbReport from "../../data/report/report.js";

import { formatDate } from "../../utils/formateDate.js";

let db = new dbReport();

const state = {
  userGenerate: "",
  userCharge: "",
  typeReport: "product",
  report: {},
  dataReport: [],
  dateIn: formatDate(Date()),
  dateOut: formatDate(Date())
};

const actions = {
  [types.actions.GenerateReport]: ({ commit, state }) => {
    if (state.typeReport == "product") {
    } else if (state.typeReport == "historyPurchase") {
      db.viewHistoryPurchase({
        dateIn: state.dateIn,
        dateOut: state.dateOut,
      }).then(res => {
        commit(types.mutations.setDataReport,res);
      });
    } else if (state.typeReport == "historySale") {
      db.viewHistorySale({
        dateIn: state.dateIn,
        dateOut: state.dateOut
      }).then(res => {
        commit(types.mutations.setDataReport,res);
      });
    } else if (state.typeReport == "general") {
      db.viewCostSaleProduct({
        dateIn: state.dateIn,
        dateOut: state.dateOut
      }).then(res => {
        commit(types.mutations.setDataReport,res);
      });
    }
  },
  [types.actions.SaveReport]: ({ commit, state }) => {},
  [types.actions.PrintReport]: ({ commit, state }) => {}
};

const getters = {
  [types.getters.getValidReport]: state => {
    return !!state.userGenerate && !!state.userCharge;
  },
  [types.getters.getUserGenerate]: state => {
    return state.userGenerate;
  },
  [types.getters.getUserCharge]: state => {
    return state.userCharge;
  },
  [types.getters.getTypeReport]: state => {
    return state.typeReport;
  },
  [types.getters.getReport]: state => {
    return state.report;
  },
  [types.getters.getDataReport]: state => {
    return state.dataReport;
  },
  [types.getters.getDateIn]: state => {
    return state.dateIn;
  },
  [types.getters.getDateOut]: state => {
    return state.dateOut;
  }
};

const mutations = {
  [types.mutations.setResetReport]: (state, query) => {
    state.userGenerate = "";
    state.userCharge = "";
    state.typeReport = "product";
    state.report = {};
    state.dataReport = [];
    state.dateIn = formatDate(Date());
    state.dateOut = formatDate(Date());
  },
  [types.mutations.setUserGenerate]: (state, query) => {
    state.userGenerate = query;
  },
  [types.mutations.setUserCharge]: (state, query) => {
    state.userCharge = query;
  },
  [types.mutations.setTypeReport]: (state, query) => {
    state.typeReport = query;
  },
  [types.mutations.setReport]: (state, query) => {
    state.report = query;
  },
  [types.mutations.setDataReport]: (state, query) => {
    state.dataReport = query;
  },
  [types.mutations.setDateIn]: (state, query) => {
    state.dateIn = query;
  },
  [types.mutations.setDateOut]: (state, query) => {
    state.dateOut = query;
  }
};

export default {
  state,
  actions,
  getters,
  mutations
};
