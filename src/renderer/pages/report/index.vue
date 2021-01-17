<template>
  <div class="report">
    <section class="hero is-info">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Reportes
          </h1>
        </div>
      </div>
    </section>
    <div class="reportPag" alt="Max-width 90%">
      <div class="container">
        <div class="section">
          <div class="container">
            <h1 class="title">Generar Reporte</h1>
          </div>
          <div class="section">
            <div class="columns">
              <div class="column is-three-quarters">
                <b-field label="Realizado por:">
                  <b-input
                    type="text"
                    placeholder="Ingresar Nombre"
                    v-model="userGenerate"
                  />
                </b-field>
              </div>
              <div class="column">
                <b-field label="Cargo:">
                  <b-input
                    type="text"
                    placeholder="Ingresar Cargo"
                    v-model="userCharge"
                  />
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <b-field label="Tipo de Reporte">
                  <b-select
                    placeholder="Seleccionar"
                    v-model="typeReport"
                    expanded
                  >
                    <option
                      :key="index"
                      v-for="(option, index) in options"
                      :value="option.key"
                    >
                      {{ option.value }}
                    </option>
                  </b-select>
                </b-field>
              </div>
              <div class="column">
                <b-field label="Fecha Inicial" v-if="typeReport != 'product'">
                  <b-input
                    type="Date"
                    placeholder="Ingresar"
                    v-model="dateIn"
                  />
                </b-field>
              </div>
              <div class="column">
                <b-field label="Fecha Final" v-if="typeReport != 'product'">
                  <b-input
                    type="Date"
                    placeholder="Ingresar"
                    v-model="dateOut"
                  />
                </b-field>
              </div>
            </div>
            <div class="buttons level-right">
              <b-button
                type="is-link"
                label="Generar"
                @click="generateReport"
              />
            </div>
          </div>
        </div>
        <div class="section">
          <div class="container">
            <h1 class="title">Vista del Reporte</h1>
          </div>
          <TableHistoryPurchase v-if="typeReport == 'historyPurchase'"/>
           <TableHistortSale v-if="typeReport == 'historySale'"/>
            <General v-if="typeReport == 'general'"/>
        </div>
        <div class="section">
          <div class="container">
            <h1 class="title">Opciones de Salida</h1>
          </div>
          <div class="section">
            <b-tabs v-model="activeTab">
              <b-tab-item label="Imprimir">
                Lorem ipsum dolor sit amet.
              </b-tab-item>
              <b-tab-item label="Guardar">
                Lorem <br />
                ipsum <br />
                dolor <br />
                sit <br />
                amet.
              </b-tab-item>
            </b-tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import types from "../../../types/report/report.js";
import TableHistoryPurchase from '../../components/report/TableHistoryPurchase';
import TableHistortSale from '../../components/report/TableHistortSale';
import General from '../../components/report/General';
export default {
  data() {
    return {
      activeTab: 0,
      options: [
        {key: "historyPurchase", value: "Histórico de Compras" },
        {key: "historySale", value: "Histórico de Ventas" },
        {key: "general", value: "Costo de Ventas Por Producto" }
      ]
    };
  },
  components: {TableHistoryPurchase,TableHistortSale,General},
  computed: {
    ...mapGetters({
      getValidReport: types.getters.getValidReport,
      getUserGenerate: types.getters.getUserGenerate,
      getUserCharge: types.getters.getUserCharge,
      getTypeReport: types.getters.getTypeReport,
      getReport: types.getters.getReport,
      getDataReport: types.getters.getDataReport,
      getDateIn: types.getters.getDateIn,
      getDateOut: types.getters.getDateOut
    }),
    userGenerate: {
      get: function() {
        return this.getUserGenerate;
      },
      set: function(val) {
        this.setUserGenerate(val);
      }
    },
    userCharge: {
      get: function() {
        return this.getUserCharge;
      },
      set: function(val) {
        this.setUserCharge(val);
      }
    },
    typeReport: {
      get: function() {
        return this.getTypeReport;
      },
      set: function(val) {
        this.setDataReport([]);
        this.setTypeReport(val);
      }
    },
    dateIn: {
      get: function() {
        return this.getDateIn;
      },
      set: function(val) {
        this.setDateIn(val);
      }
    },
    dateOut: {
      get: function() {
        return this.getDateOut;
      },
      set: function(val) {
        this.setDateOut(val);
      }
    }
  },
  methods: {
    ...mapActions({
      generateReport: types.actions.GenerateReport,
      saveReport: types.actions.SaveReport,
      PrintReport: types.actions.PrintReport
    }),
    ...mapMutations({
      setResetReport: types.mutations.setResetReport,
      setUserGenerate: types.mutations.setUserGenerate,
      setUserCharge: types.mutations.setUserCharge,
      setTypeReport: types.mutations.setTypeReport,
      setReport: types.mutations.setReport,
      setDataReport: types.mutations.setDataReport,
      setDateIn: types.mutations.setDateIn,
      setDateOut: types.mutations.setDateOut
    })
  }
};
</script>
