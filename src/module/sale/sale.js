import types from "../../types/sale/sale.js";
import dbSale from "../../data/sale/sale.js";
import reportSale from "../../data/report/bill.js";

import { formatDate } from "../../utils/formateDate.js";

let db = new dbSale();

const state = {
  idSale: 0,
  code: "",
  client: "",
  date: formatDate(Date()),
  total: 0,
  cash: 0,
  change: 0,
  listDt: [],
  listDelDt: [],
  listSale: [],
  viewSearch: "",
  viewOption: "client",
  dateIn: formatDate(Date()),
  dateOut: formatDate(Date()),
  option: "add"
};

const actions = {
  [types.actions.addSale]: ({ getters, dispatch, state }) => {
    let valid = getters[types.getters.validSale];
    let sale = {
      code: state.code,
      client: state.client,
      date: formatDate(Date(state.date)),
      total: state.total,
      cash: state.cash,
      change: state.change,
      listDt: state.listDt
    };
    if (valid) {
      db.add(sale)
        .then(() => {
          dispatch(types.actions.reportSale);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  [types.actions.upSale]: ({ getters, commit, state }) => {
    let valid = getters[types.getters.validSale];
    let sale = {
      id: state.idSale,
      code: state.code,
      client: state.client,
      date: state.date,
      total: state.total,
      cash: state.cash,
      change: state.change,
      listDt: state.listDt,
      listDelDt: state.listDelDt
    };
    if (valid) {
      db.update(sale)
        .then(resp => {
          commit(types.mutations.setReset);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  [types.actions.delSale]: ({ dispatch, state }, id) => {
    if (id != 0) {
      db.del(id)
        .then(resp => {
          if (resp) {
            console.log("La venta se a eliminado correctamente.");
            dispatch(types.actions.viewSale, {
              dateIn: state.dateIn,
              dateOut: state.dateOut,
              option: state.viewOption,
              search: state.viewSearch
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  [types.actions.ChangeDtSale]: ({ commit, state }, query) => {
    let dts = state.listDt;
    let newDts = [];
    let newDelDts = [];
    let total = 0;

    state.listDelDt.forEach(item => {
      newDelDts.push(item);
    });

    dts.forEach(item => {
      if (item.product != query.dt.product) {
        newDts.push(item);
        total += item.total;
      }
    });

    if (query.option != "delete" && query.dt.product != "") {
      if (query.dt.id != 0) {
        query.dt.option = "up";
      } else {
        query.dt.option = "add";
      }
      newDts.push(query.dt);
      total += query.dt.total;
    } else if (query.dt.product != "" && query.dt.id != 0) {
      newDelDts.push(query.dt);
    }

    commit(types.mutations.setListDelDt, newDelDts);
    commit(types.mutations.setTotal, total);
    commit(types.mutations.setListDt, newDts);
  },
  [types.actions.viewSale]: ({ commit }, query) => {
    db.view(query).then(sale => {
      commit(types.mutations.setListSale, sale);
    });
  },
  [types.actions.viewDtSale]: ({ commit }, idSale) => {
    db.viewDt(idSale).then(dt => {
      commit(types.mutations.setListDt, dt);
    });
  },
  [types.actions.reportSale]: ({ commit }) => {
    let sale = {
      code: state.code,
      client: state.client,
      date: formatDate(Date(state.date), "normal"),
      total: state.total,
      cash: state.cash,
      change: state.change,
      listDt: state.listDt
    };
    let report = new reportSale(sale);
    report
      .fill()
      .then(res => {
        console.log(res);
        return report.generatePDF();
      })
      .then(res => {
        console.log(res);
        return report.print();
      })
      .then(res => {
        console.log(res);
        return report.delFile();
      })
      .then(res => {
        console.log(res);
        commit(types.mutations.setReset);
      });
  }
};

const getters = {
  [types.getters.validSale]: state => {
    return (
      state.code != "" &&
      state.client != "" &&
      state.listDt.length > 0 &&
      state.change >= 0
    );
  },
  [types.getters.getIdSale]: state => {
    return state.idSale;
  },
  [types.getters.getCode]: state => {
    return state.code;
  },
  [types.getters.getClient]: state => {
    return state.client;
  },
  [types.getters.getDate]: state => {
    return state.date;
  },
  [types.getters.getTotal]: state => {
    return state.total;
  },
  [types.getters.getCash]: state => {
    return state.cash;
  },
  [types.getters.getChange]: state => {
    return state.change;
  },
  [types.getters.getListDt]: state => {
    return state.listDt;
  },
  [types.getters.getListSale]: state => {
    return state.listSale;
  },
  [types.getters.getViewSearch]: state => {
    return state.viewSearch;
  },
  [types.getters.getViewOption]: state => {
    return state.viewOption;
  },
  [types.getters.getDateIn]: state => {
    return state.dateIn;
  },
  [types.getters.getDateOut]: state => {
    return state.dateOut;
  },
  [types.getters.getOption]: state => {
    return state.option;
  }
};

const mutations = {
  [types.mutations.setIdSale]: (state, query) => {
    state.idSale = query;
  },
  [types.mutations.setCode]: (state, query) => {
    state.code = query;
  },
  [types.mutations.setClient]: (state, query) => {
    state.client = query;
  },
  [types.mutations.setDate]: (state, query) => {
    state.date = formatDate(query);
  },
  [types.mutations.setTotal]: (state, query) => {
    state.total = query;
  },
  [types.mutations.setCash]: (state, query) => {
    state.cash = query;
  },
  [types.mutations.setChange]: (state, query) => {
    state.change = query;
  },
  [types.mutations.setReset]: (state, query) => {
    state.idSale = 0;
    state.code = "";
    state.client = "";
    state.date = Date();
    state.total = 0;
    state.cash = 0;
    state.change = 0;
    state.listDt = [];
    state.listDelDt = [];
    state.listSale = [];
    state.getViewSearch = "";
    state.viewOption = "client";
    state.dateIn = formatDate(Date());
    state.dateOut = formatDate(Date());
    state.option = "add";
  },
  [types.mutations.setListDt]: (state, query) => {
    state.listDt = query;
  },
  [types.mutations.setListDelDt]: (state, query) => {
    state.listDelDt = query;
  },
  [types.mutations.setListSale]: (state, query) => {
    state.listSale = query;
  },
  [types.mutations.setViewSearch]: (state, query) => {
    state.viewSearch = query;
  },
  [types.mutations.setViewOption]: (state, query) => {
    state.viewOption = query;
  },
  [types.mutations.setDateIn]: (state, query) => {
    state.dateIn = query;
  },
  [types.mutations.setDateOut]: (state, query) => {
    state.dateOut = query;
  },
  [types.mutations.setOption]: (state, query) => {
    state.option = query;
  }
};

export default {
  state,
  actions,
  getters,
  mutations
};
