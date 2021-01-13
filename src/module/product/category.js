import types from "../../types/product/category.js";
import dbCategory from "../../data/product/category.js";

let db = new dbCategory();

const state = {
  idCategory: 0,
  typeQuery: "add",
  activeCategory: false,
  category: "",
  upCategory: "",
  listCategory: []
};

const actions = {
  [types.actions.addCategory]: ({ dispatch, commit, state }) => {
    if (!!state.category) {
      db.add(state.category)
        .then(resp => {
          if (resp) {
            commit(types.mutations.setCategory, "");
            console.log("La categoria se a insertado correctamente.");
            dispatch(types.actions.viewCategory);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  [types.actions.upCategory]: ({ dispatch, commit, state }) => {
    if (!!state.category && state.category != state.upCategory) {
      db.update({ id: state.idCategory, name: state.category })
        .then(resp => {
          if (resp) {
            commit(types.mutations.setCategory, "");
            console.log("La categoria se a actualizado correctamente.");
            dispatch(types.actions.viewCategory);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  [types.actions.delCategory]: ({ dispatch, commit }, category) => {
    db.delete(category.name)
      .then(resp => {
        if (resp) {
          console.log("La categoria se a eliminado correctamente.");
          dispatch(types.actions.viewCategory);
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  [types.actions.viewCategory]: ({ commit }) => {
    db.view().then(dt => {
      commit(types.mutations.setListCategory, dt);
    });
  },
  [types.actions.resetCategory]: ({ commit }) => {
    commit(types.mutations.setTypeQuery, "add");
    commit(types.mutations.setCategory, "");
    commit(types.mutations.setUpCategory, "");
  }
};

const getters = {
  [types.getters.getTypeQuery]: state => {
    return state.typeQuery;
  },
  [types.getters.getCategory]: state => {
    return state.category;
  },
  [types.getters.getUpCategory]: state => {
    return state.upCategory;
  },
  [types.getters.getActiveCategory]: state => {
    return state.activeCategory;
  },
  [types.getters.getListCategory]: state => {
    return state.listCategory;
  }
};

const mutations = {
  [types.mutations.setIdCategory]: (state, query) => {
    state.idCategory = query;
  },
  [types.mutations.setTypeQuery]: (state, query) => {
    state.typeQuery = query;
  },
  [types.mutations.setCategory]: (state, query) => {
    state.activeCategory = !!query;
    state.category = query;
  },
  [types.mutations.setUpCategory]: (state, query) => {
    state.upCategory = query;
  },
  [types.mutations.setListCategory]: (state, query) => {
    state.listCategory = query;
  }
};

export default {
  state,
  actions,
  getters,
  mutations
};
