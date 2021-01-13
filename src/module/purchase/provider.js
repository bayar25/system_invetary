import types from "../../types/purchase/provider.js";
import dbProvider from "../../data/purchase/provider.js";

let db = new dbProvider();

const state = {
  idProvider:0,
  typeQuery: "add",
  activeProvider: false,
  activePhone: false,
  provider: "",
  upProvider: "",
  phone: "",
  upPhone: "",
  listProvider: []
};

const actions = {
  [types.actions.addProvider]: ({ dispatch, commit, state }) => {
    if (!!state.provider && !!state.phone) {
      db.add({name:state.provider,phone:state.phone})
        .then(resp => {
          if (resp) {
            
            console.log("La marca se a insertado correctamente.");
            dispatch(types.actions.resetProvider);
            dispatch(types.actions.viewProvider);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  [types.actions.upProvider]: ({ dispatch, commit, state }) => {
    if ((!!state.provider && state.provider != state.upProvider) ||(!!state.phone && state.phone != state.upPhone)) {
      db.update({id:state.idProvider,name:state.provider,phone:state.phone})
        .then(resp => {
          if (resp) {
            
            console.log("La marca se a actualizado correctamente.");
            dispatch(types.actions.resetProvider);
            dispatch(types.actions.viewProvider);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  [types.actions.delProvider]: ({ dispatch, commit, state }) => {
    if (!!state.provider) {
      db.delete(state.provider)
        .then(resp => {
          if (resp) {
            console.log("La marca se a eliminado correctamente.");
            dispatch(types.actions.viewProvider);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  [types.actions.viewProvider]: ({ commit }) => {
    db.view().then(dt => {
      commit(types.mutations.setListProvider, dt);
    });
  },
  [types.actions.resetProvider]: ({ commit }) => {
    commit(types.mutations.setTypeQuery, "add");
    commit(types.mutations.setIdProvider, 0);
    commit(types.mutations.setProvider, "");
    commit(types.mutations.setUpProvider, "");
    commit(types.mutations.setPhone, "");
    commit(types.mutations.setUpPhone, "");
  }
};

const getters = {
  [types.getters.getTypeQuery]: state => {
    return state.typeQuery;
  },
  [types.getters.getProvider]: state => {
    return state.provider;
  },
  [types.getters.getUpProvider]: state => {
    return state.upProvider;
  },
  [types.getters.getPhone]: state => {
    return state.phone;
  },
  [types.getters.getUpPhone]: state => {
    return state.upPhone;
  },
  [types.getters.getActiveProvider]: state => {
    return state.activeProvider;
  },
  [types.getters.getActivePhone]: state => {
    return state.activePhone;
  },
  [types.getters.getListProvider]: state => {
    return state.listProvider;
  }
};

const mutations = {
  [types.mutations.setIdProvider]: (state, query) => {
    state.idProvider = query;
  },
  [types.mutations.setTypeQuery]: (state, query) => {
    state.typeQuery = query;
  },
  [types.mutations.setProvider]: (state, query) => {
    state.activePhone = !!query;
    state.provider = query;
  },
  [types.mutations.setUpProvider]: (state, query) => {
    state.upProvider = query;
  },
  [types.mutations.setPhone]: (state, query) => {
    state.activeProvider = !!query;
    state.phone = query;
  },
  [types.mutations.setUpPhone]: (state, query) => {
    state.upPhone = query;
  },
  [types.mutations.setListProvider]: (state, query) => {
    state.listProvider = query;
  }
};

export default {
  state,
  actions,
  getters,
  mutations
};
