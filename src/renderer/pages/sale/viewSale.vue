<template>
  <div class="viewPurchase">
    <section class="hero is-info">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Ventas Realizadas
          </h1>
        </div>
      </div>
    </section>
    <div class="viewPurchasePag">
      <section class="section">
        <div class="container">
          <h1 class="title">Buscar de Venta</h1>
        </div>
        <section class="section">
          <div class="columns">
            <div class="column">
              <b-field label="Opcion de Busqueda">
                <b-select
                  placeholder="Seleccionar"
                  v-model="viewOption"
                  expanded
                >
                  <option
                    v-for="(option, index) in options"
                    :value="option.key"
                    :key="index"
                  >
                    {{ option.value }}
                  </option>
                </b-select>
              </b-field>
            </div>
            <div class="column is-four-fifths">
              <b-field label="Buscar">
                <b-input type="text" placeholder="Ingresar" v-model="viewSearch" />
              </b-field>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <b-field label="Fecha Inicial">
                <b-input type="Date" placeholder="Ingresar" v-model="dateIn" />
              </b-field>
            </div>
            <div class="column">
              <b-field label="Fecha Final">
                <b-input type="Date" placeholder="Ingresar" v-model="dateOut" />
              </b-field>
            </div>
          </div>
          <div class="buttons level-right">
            <b-button type="is-link" label="Buscar" @click="searchClick" />
          </div>
        </section>
      </section>
    </div>
    <div class="section">
      <div class="container">
        <h1 class="title">Lista de Ventas</h1>
      </div>
      <div class="section">
        <b-table :data="getListSale" :striped="true">
          <b-table-column
            field="id"
            label="Id"
            width="5%"
            numeric
            v-slot="props"
          >
            {{ props.index + 1 }}
          </b-table-column>
          <b-table-column
            field="code"
            label="Codigo"
            width="10%"
            numeric
            v-slot="props"
          >
            {{ props.row.code }}
          </b-table-column>
          <b-table-column
            field="product"
            label="Clientes"
            width="25%"
            numeric
            v-slot="props"
          >
            {{ props.row.client }}
          </b-table-column>
          <b-table-column
            field="date"
            label="Fecha"
            width="10%"
            numeric
            v-slot="props"
          >
            {{ new Date(props.row.date).toLocaleDateString() }}
          </b-table-column>
          <b-table-column
            field="total"
            label="Total"
            width="10%"
            numeric
            v-slot="props"
          >
            {{ props.row.total }}
          </b-table-column>
          <b-table-column
            field="cash"
            label="Efectivo"
            width="10%"
            numeric
            v-slot="props"
          >
            {{ props.row.cash }}
          </b-table-column>
          <b-table-column
            field="change"
            label="Cambio"
            width="10%"
            numeric
            v-slot="props"
          >
            {{ props.row.change }}
          </b-table-column>
          <b-table-column
            field="options"
            label="Opciones"
            width="20%"
            centered
            v-slot="props"
          >
            <b-button type="is-success" @click="up(props.row)">
              <i
                class="justify-content-center fas fa-pen text-success d-flex"
              ></i
            ></b-button>
            <b-button type="is-danger" @click="del(props.row.id)">
              <i
                class="d-flex justify-content-center fas fa-trash text-danger"
              ></i
            ></b-button>
          </b-table-column>
        </b-table>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import types from "../../../types/sale/sale.js";

import { formatDate } from "../../../utils/formateDate.js";

export default {
  data() {
    return {
      options: [
        { key: "client", value: "Clientes" },
        { key: "code", value: "Codigo" }
      ]
    };
  },
  computed: {
    ...mapGetters({
      getListSale: types.getters.getListSale,
      getViewSearch: types.getters.getViewSearch,
      getViewOption: types.getters.getViewOption,
      getDateIn: types.getters.getDateIn,
      getDateOut: types.getters.getDateOut
    }),
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
    },
    viewSearch: {
      get: function() {
        return this.getViewSearch;
      },
      set: function(val) {
        this.setViewSearch(val);
      }
    },
    viewOption: {
      get: function() {
        return this.getViewOption;
      },
      set: function(val) {
        this.setViewOption(val);
      }
    }
  },
  methods: {
    ...mapActions({
      viewSale: types.actions.viewSale,
      viewDtSale: types.actions.viewDtSale,
      del: types.actions.delSale
    }),
    ...mapMutations({
      setDateIn: types.mutations.setDateIn,
      setDateOut: types.mutations.setDateOut,
      setIdSale: types.mutations.setIdSale,
      setCode: types.mutations.setCode,
      setClient: types.mutations.setClient,
      setViewSearch: types.mutations.setViewSearch,
      setViewOption: types.mutations.setViewOption,
      setDate: types.mutations.setDate,
      setTotal: types.mutations.setTotal,
      setCash: types.mutations.setCash,
      setChange: types.mutations.setChange,
      setOption: types.mutations.setOption
    }),
    up(sale) {
      this.setOption("up");
      this.viewDtSale(sale.id);
      this.setIdSale(sale.id);
      this.setCode(sale.code);
      this.setClient(sale.client);
      this.setDate(Date(sale.date));
      this.setTotal(sale.total);
      this.setCash(sale.cash);
      this.setChange(sale.change);

      this.$router.push("/sale/");
    },
    format(val) {
      return formatDate(val);
    },
    searchClick() {
      this.viewSale({
        dateIn: this.dateIn,
        dateOut: this.dateOut,
        option: this.viewOption,
        search: this.viewSearch
      });
    }
  },
  mounted() {
    this.searchClick();
  }
};
</script>
<style>
.viewPurchase {
  display: grid;
  grid-template-rows: auto 1fr;
}
.viewPurchasePag {
  overflow: auto;
}
</style>
