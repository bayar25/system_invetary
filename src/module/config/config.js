import fs from "fs";
import types from "../../types/config/config";
import printSystem from "../../report/print";
import { remote } from "electron";

const state = {
  printer: "",
  listPrinter: []
};

const actions = {
  [types.actions.configPrint]: ({ commit, state }) => {
    if (!!state.printer) {
      fs.readFile(
        remote.app.getPath("documents") + "/config.json",
        (err, data) => {
          let config = {};
          if (!!data) {
            config = JSON.parse(data);
          } else {
            config = { print: { printer: "", pagSize: "" } };
          }
          config.print.printer = state.printer;
          const configString = JSON.stringify(config);
          fs.writeFile(
            remote.app.getPath("documents") + "/config.json",
            configString,
            err => {
              if (err) {
                reject(err);
              } else {
                console.log("Configuracion de Impresion realizada.");
              }
            }
          );
        }
      );
    }
  },
  [types.actions.viewPrinter]: ({ commit, state }) => {
    let print = new printSystem();
    print
      .getPrinter()
      .then(resp => {
        commit(types.mutations.setListPrinter, resp);
      })
      .catch(err => {
        console.log(err);
      });
  }
};

const getters = {
  [types.getters.getPrinter]: state => {
    return state.printer;
  },
  [types.getters.getListPrinter]: state => {
    return state.listPrinter;
  }
};

const mutations = {
  [types.mutations.setPrinter]: (state, query) => {
    state.printer = query;
  },
  [types.mutations.setListPrinter]: (state, query) => {
    state.listPrinter = query;
  }
};

export default {
  state,
  actions,
  getters,
  mutations
};
