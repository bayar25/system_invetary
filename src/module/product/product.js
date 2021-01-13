import types from "../../types/product/product.js";
import dbProduct from "../../data/product/product.js";

let db = new dbProduct();

const state = {
  idProduct: 0,
  typeQuery: "add",
  activeProduct: false,
  product: "",
  upProduct: "",
  idCategory: 0,
  idBrand: 0,
  listProductSearch: [],
  listProduct: []
};

const actions = {
  [types.actions.addProduct]: ({ dispatch, commit, state }) => {
    if (!!state.product) {
      db.add({
        name: state.product,
        idBrand: state.idBrand,
        idCategory: state.idCategory
      })
        .then(resp => {
          if (resp) {
            console.log("El producto se a insertado correctamente.");
            dispatch(types.actions.resetProduct);
            dispatch(types.actions.viewProduct);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  [types.actions.upProduct]: ({ dispatch, commit, state }) => {
    if (!!state.product && state.product != state.upProduct) {
      db.update({
        id: state.idProduct,
        name: state.product,
        idBrand: state.idBrand,
        idCategory: state.idCategory
      })
        .then(resp => {
          if (resp) {
            console.log("El producto se a actualizado correctamente.");
            dispatch(types.actions.resetProduct);
            dispatch(types.actions.viewProduct);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  [types.actions.delProduct]: ({ dispatch}, product) => {
      db.delete(product.id)
        .then(resp => {
          if (resp) {
            console.log("El producto se a eliminado correctamente.");
            dispatch(types.actions.resetProduct);
            dispatch(types.actions.viewProduct);
          }
        })
        .catch(err => {
          console.log(err);
        });
  },
  [types.actions.viewProduct]: ({ commit }, product) => {
    db.view(product).then(dt => {
      commit(types.mutations.setListProduct, dt);
    });
  },
  [types.actions.viewProductSearch]: ({ commit }, product) => {
    db.viewSearch(product).then(dt => {
      commit(types.mutations.setListProductSearch, dt);
    });
  },
  [types.actions.resetProduct]: ({ commit }) => {
    commit(types.mutations.setTypeQuery, "add");
    commit(types.mutations.setProduct, "");
    commit(types.mutations.setUpProduct, "");
    commit(types.mutations.setIdCategory, 0);
    commit(types.mutations.setIdBrand, 0);
  }
};

const getters = {
  [types.getters.getIdProduct]: state => {
    return state.idProduct;
  },
  [types.getters.getTypeQuery]: state => {
    return state.typeQuery;
  },
  [types.getters.getActiveProduct]: state => {
    return state.activeProduct;
  },
  [types.getters.getProduct]: state => {
    return state.product;
  },
  [types.getters.getUpProduct]: state => {
    return state.upProduct;
  },
  [types.getters.getIdCategory]: state => {
    return state.idCategory;
  },
  [types.getters.getIdBrand]: state => {
    return state.idBrand;
  },
  [types.getters.getListProductSearch]: state => {
    return state.listProductSearch;
  },
  [types.getters.getListProduct]: state => {
    return state.listProduct;
  }
};

const mutations = {
  [types.mutations.setTypeQuery]: (state, query) => {
    state.typeQuery = query;
  },
  [types.mutations.setIdProduct]: (state, query) => {
    state.idProduct = query;
  },
  [types.mutations.setProduct]: (state, query) => {
    state.activeProduct = !!query;
    state.product = query;
  },
  [types.mutations.setUpProduct]: (state, query) => {
    state.upProduct = query;
  },
  [types.mutations.setIdCategory]: (state, query) => {
    state.idCategory = query;
  },
  [types.mutations.setIdBrand]: (state, query) => {
    state.idBrand = query;
  },
  [types.mutations.setListProductSearch]: (state, query) => {
    state.listProductSearch = query;
  },
  [types.mutations.setListProduct]: (state, query) => {
    state.listProduct = query;
  }
};

export default {
  state,
  actions,
  getters,
  mutations
};
