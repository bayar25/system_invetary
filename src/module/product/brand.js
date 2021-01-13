import types from "../../types/product/brand.js";
import dbBrand from "../../data/product/brand.js";

let db = new dbBrand();

const state = {
  idBrand:0,
  typeQuery: "add",
  activeBrand: false,
  brand: "",
  upBrand: "",
  listBrand: []
};

const actions = {
  [types.actions.addBrand]: ({ dispatch, commit, state }) => {
    if (!!state.brand) {
      db.add(state.brand)
        .then(resp => {
          if (resp) {
            commit(types.mutations.setBrand, "");
            console.log("La marca se a insertado correctamente.");
            dispatch(types.actions.viewBrand);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  [types.actions.upBrand]: ({ dispatch, commit, state }) => {
    if (!!state.brand && state.brand != state.upBrand) {
      db.update({id:state.idBrand,name:state.brand})
        .then(resp => {
          if (resp) {
            commit(types.mutations.setBrand, "");
            console.log("La marca se a actualizado correctamente.");
            dispatch(types.actions.viewBrand);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  [types.actions.delBrand]: ({ dispatch, commit},brand) => {
      db.delete(brand.name)
        .then(resp => {
          if (resp) {
            commit(types.mutations.setBrand, "");
            console.log("La marca se a eliminado correctamente.");
            dispatch(types.actions.viewBrand);
          }
        })
        .catch(err => {
          console.log(err);
        });
  },
  [types.actions.viewBrand]: ({ commit }) => {
    db.view().then(dt => {
      commit(types.mutations.setListBrand, dt);
    });
  },
  [types.actions.resetBrand]: ({ commit }) => {
    commit(types.mutations.setTypeQuery, "add");
    commit(types.mutations.setBrand, "");
    commit(types.mutations.setUpBrand, "");
  }
};

const getters = {
  [types.getters.getTypeQuery]: state => {
    return state.typeQuery;
  },
  [types.getters.getBrand]: state => {
    return state.brand;
  },
  [types.getters.getUpBrand]: state => {
    return state.upBrand;
  },
  [types.getters.getActiveBrand]: state => {
    return state.activeBrand;
  },
  [types.getters.getListBrand]: state => {
    return state.listBrand;
  }
};

const mutations = {
  [types.mutations.setIdBrand]: (state, query) => {
    state.idBrand = query;
  },
  [types.mutations.setTypeQuery]: (state, query) => {
    state.typeQuery = query;
  },
  [types.mutations.setBrand]: (state, query) => {
    state.activeBrand = !!query;
    state.brand = query;
  },
  [types.mutations.setUpBrand]: (state, query) => {
    state.upBrand = query;
  },
  [types.mutations.setListBrand]: (state, query) => {
    state.listBrand = query;
  }
};

export default {
  state,
  actions,
  getters,
  mutations
};
