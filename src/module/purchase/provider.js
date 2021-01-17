import types from "../../types/purchase/provider.js";
import dbProvider from "../../data/purchase/provider.js";

let db = new dbProvider();

const state = {
  idProvider: 0,
  typeQuery: "add",
  provider: "",
  upProvider: "",
  listProvider: []
};

const actions = {
  [types.actions.addProvider]: ({ dispatch, commit, state }) => {
    if (!!state.provider) {
      db.add({ name: state.provider })
        .then(resp => {
          if (resp) {
            console.log("El Proveedor se a insertado correctamente.");
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
    if (!!state.provider && state.provider != state.upProvider) {
      db.update({
        id: state.idProvider,
        name: state.provider
      })
        .then(resp => {
          if (resp) {
            console.log("El Proveedor se a actualizado correctamente.");
            dispatch(types.actions.resetProvider);
            dispatch(types.actions.viewProvider);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  [types.actions.delProvider]: ({ dispatch, commit, state }, provider) => {
    if (!!provider.name) {
      db.delete(provider)
        .then(resp => {
          if (resp) {
            console.log("El Proveedor se a eliminado correctamente.");
            dispatch(types.actions.resetProvider);
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
  }
};

const getters = {
  [types.getters.getValidProvider]: state => {
    if (state.typeQuery == "update") {
      return state.provider != "" || state.provider != state.upProvider
    }
    return state.provider != "";
  },
  [types.getters.getTypeQuery]: state => {
    return state.typeQuery;
  },
  [types.getters.getProvider]: state => {
    return state.provider;
  },
  [types.getters.getUpProvider]: state => {
    return state.upProvider;
  },
  [types.getters.getListProvider]: state => {
    return state.listProvider;
  }
};

const mutations = {
  [types.mutations.setTypeQuery]: (state, query) => {
    state.typeQuery = query;
  },
  [types.mutations.setIdProvider]: (state, query) => {
    state.idProvider = query;
  },
  [types.mutations.setProvider]: (state, query) => {
    state.provider = query;
  },
  [types.mutations.setUpProvider]: (state, query) => {
    state.upProvider = query;
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
