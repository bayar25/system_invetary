<template>
  <div class="report">
    <section class="hero is-info">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Configuración
          </h1>
        </div>
      </div>
    </section>
    <div class="reportPag" alt="Max-width 90%">
      <b-tabs v-model="activeTab">
        <b-tab-item label="Compras"></b-tab-item>
        <b-tab-item label="Productos"></b-tab-item>
        <b-tab-item label="Ventas"></b-tab-item>
        <b-tab-item label="Reportes"></b-tab-item>
        <b-tab-item label="Usuario"></b-tab-item>
        <b-tab-item label="Imprimir">
          <section class="section">
            <div class="columns">
              <div class="column">
                <b-field label="Opcion de Busqueda">
                  <b-select
                    placeholder="Seleccionar"
                    v-model="printer"
                    expanded
                  >
                    <option
                      v-for="(item, index) in getListPrinter"
                      :value="item"
                      :key="index"
                    >
                      {{ item }}
                    </option>
                  </b-select>
                </b-field>
              </div>
              <div class="column is-four-fifths"></div>
            </div>
            <div class="buttons level-right">
              <b-button type="is-link" label="Cambiar" @click="configPrint" :disabled="!printer" />
            </div>
          </section>
        </b-tab-item>
        <b-tab-item label="Guardar"></b-tab-item>
      </b-tabs>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import types from "../../../types/config/config";

export default {
  data() {
    return {
      activeTab: 0
    };
  },
  computed: {
    ...mapGetters({
      getPrinter: types.getters.getPrinter,
      getListPrinter: types.getters.getListPrinter
    }),
    printer: {
      get: function() {
        return this.getPrinter;
      },
      set: function(val) {
        this.setPrinter(val);
      }
    }
  },
  methods: {
    ...mapActions({
      configPrint: types.actions.configPrint,
      viewPrinter: types.actions.viewPrinter
    }),
    ...mapMutations({ setPrinter: types.mutations.setPrinter })
  },
  mounted() {
    this.viewPrinter();
  }
};
</script>
