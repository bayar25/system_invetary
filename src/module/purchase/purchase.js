import types from "../../types/purchase/purchase.js";
import dbPurchase from "../../data/purchase/purchase.js";

import { formatDate } from "../../utils/formateDate.js";

let db = new dbPurchase();

const state = {
  idPurchase: 0,
  idProvider: 0,
  date: formatDate(Date()),
  total: 0,
  listDt: [],
  listDelDt: [],
  listPurchase: [],
  viewIdProvider: 1,
  dateIn: formatDate(Date()),
  dateOut: formatDate(Date()),
  option: "add"
};

const actions = {
  [types.actions.addPurchase]: ({ getters, commit, state }) => {
    let valid = getters[types.getters.validPurchase];
    let Purchase = {
      date: state.date,
      total: state.total,
      idProvider: state.idProvider,
      listDt: state.listDt
    };
    if (valid) {
      db.add(Purchase)
        .then(resp => {
          commit(types.mutations.setReset);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  [types.actions.upPurchase]: ({ getters, commit, state }) => {
    let valid = getters[types.getters.validPurchase];
    let Purchase = {
      id: state.idPurchase,
      date: state.date,
      total: state.total,
      idProvider: state.idProvider,
      listDt: state.listDt,
      listDelDt: state.listDelDt
    };
    if (valid) {
      db.update(Purchase)
        .then(resp => {
          commit(types.mutations.setReset);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  [types.actions.delPurchase]: ({ dispatch, state }, id) => {
    if (id != 0) {
      db.del(id)
        .then(resp => {
          if (resp) {
            console.log("La compra se a eliminado correctamente.");
            dispatch(types.actions.viewPurchase, {
              idProvider: state.idProvider,
              dateIn: state.dateIn,
              dateOut: state.dateOut
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  [types.actions.ChangeDtPurchase]: ({ commit, state }, query) => {
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
  [types.actions.viewPurchase]: ({ commit }, query) => {
    db.view(query).then(purchase => {
      commit(types.mutations.setListPurchase, purchase);
    });
  },
  [types.actions.viewDtPurchase]: ({ commit }, idPurchase) => {
    db.viewDt(idPurchase).then(dt => {
      commit(types.mutations.setListDt, dt);
    });
  }
};

const getters = {
  [types.getters.validPurchase]: state => {
    return state.idProvider != 0 && state.listDt.length > 0;
  },
  [types.getters.getIdPurchase]: state => {
    return state.idPurchase;
  },
  [types.getters.getIdProvider]: state => {
    return state.idProvider;
  },
  [types.getters.getDate]: state => {
    return state.date;
  },
  [types.getters.getTotal]: state => {
    return state.total;
  },
  [types.getters.getListDt]: state => {
    return state.listDt;
  },
  [types.getters.getListPurchase]: state => {
    return state.listPurchase;
  },
  [types.getters.getViewIdProvider]: state => {
    return state.viewIdProvider;
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
  [types.mutations.setIdPurchase]: (state, query) => {
    state.idPurchase = query;
  },
  [types.mutations.setIdProvider]: (state, query) => {
    state.idProvider = query;
  },
  [types.mutations.setDate]: (state, query) => {
    state.date = formatDate(Date(query));
  },
  [types.mutations.setTotal]: (state, query) => {
    state.total = query;
  },
  [types.mutations.setReset]: (state, query) => {
    state.idPurchase = 0;
    state.idProvider = 0;
    state.date = formatDate(Date());
    state.total = 0;
    state.listDt = [];
    state.listDelDt = [];
    state.listPurchase = [];
    state.viewIdProvider = 1;
    state.dateIn = formatDate(Date());
    state.dateOut = formatDate(Date());
    state.option = "add";
  },
  [types.mutations.setListDt]: (state, query) => {
    state.listDt = [];
    state.listDt = query;
  },
  [types.mutations.setListDelDt]: (state, query) => {
    state.listDelDt = query;
  },
  [types.mutations.setListPurchase]: (state, query) => {
    state.listPurchase = query;
  },
  [types.mutations.setViewIdProvider]: (state, query) => {
    state.viewIdProvider = query;
  },
  [types.mutations.setDateIn]: (state, query) => {
    state.dateIn = formatDate(Date(query));
  },
  [types.mutations.setDateOut]: (state, query) => {
    state.dateOut = formatDate(Date(query));
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
