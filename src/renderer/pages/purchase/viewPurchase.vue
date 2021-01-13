<template>
  <div class="viewPurchase">
    <section class="hero is-info">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Compras Realizadas
          </h1>
        </div>
      </div>
    </section>
    <div class="viewPurchasePag">
      <section class="section">
        <div class="container">
          <h1 class="title">Buscar de Compra</h1>
        </div>
        <section class="section">
          <div class="columns">
            <div class="column">
              <b-field label="Proveedor">
                <b-select
                  placeholder="Seleccionar"
                  v-model="idProvider"
                  expanded
                >
                  <option
                    v-for="option in listProvider"
                    :value="option.id"
                    :key="option.id"
                  >
                    {{ option.name }}
                  </option>
                </b-select>
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
            <b-button type="is-link" label="Agregar" @click="searchClick" />
          </div>
        </section>
      </section>
    </div>
    <div class="section">
      <div class="container">
        <h1 class="title">Lista de Compras</h1>
      </div>
      <div class="section">
        <b-table :data="getListPurchase" :striped="true">
          <b-table-column
            field="id"
            label="Id"
            width="10%"
            numeric
            v-slot="props"
          >
            {{ props.index + 1 }}
          </b-table-column>
          <b-table-column
            field="product"
            label="Proveedor"
            width="30%"
            numeric
            v-slot="props"
          >
            {{ props.row.provider }}
          </b-table-column>
          <b-table-column
            field="brand"
            label="Fecha de Ingreso"
            width="20%"
            numeric
            v-slot="props"
          >
            {{ new Date(props.row.date).toLocaleDateString() }}
          </b-table-column>
          <b-table-column
            field="category"
            label="Total"
            width="20%"
            numeric
            v-slot="props"
          >
            {{ props.row.totalPurchase }}
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
            <b-button type="is-danger" @click="del(props.row.idPurchase)">
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
import types from "../../../types/purchase/purchase.js";
import typesProviders from "../../../types/purchase/provider.js";

import { formatDate } from "../../../utils/formateDate.js";

export default {
  computed: {
    ...mapGetters({
      listProvider: typesProviders.getters.getListProvider,
      getListPurchase: types.getters.getListPurchase,
      getViewIdProvider: types.getters.getViewIdProvider,
      getDateIn: types.getters.getDateIn,
      getDateOut: types.getters.getDateOut
    }),
    idProvider: {
      get: function() {
        return this.getViewIdProvider;
      },
      set: function(val) {
        this.setViewIdProvider(val);
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
      viewProvider: typesProviders.actions.viewProvider,
      viewPurchase: types.actions.viewPurchase,
      viewDtPurchase:types.actions.viewDtPurchase,
      del: types.actions.delPurchase
    }),
    ...mapMutations({
      setViewIdProvider: types.mutations.setViewIdProvider,
      setDateIn: types.mutations.setDateIn,
      setDateOut: types.mutations.setDateOut,
      setIdPurchase: types.mutations.setIdPurchase,
      setIdProvider: types.mutations.setIdProvider,
      setDate: types.mutations.setDate,
      setTotal: types.mutations.setTotal,
      setOption: types.mutations.setOption
    }),
    up(purchase) {
      this.setOption('up');
      this.viewDtPurchase(purchase.idPurchase);
      this.setIdPurchase(purchase.idPurchase);
      this.setIdProvider(purchase.idProvider);
      this.setDate(Date(purchase.date));
      this.setTotal(purchase.totalPurchase);
      
      this.$router.push('/purchase/');
    },
    format(val) {
      return formatDate(val);
    },
    searchClick() {
      this.viewPurchase({
        idProvider: this.idProvider,
        dateIn: this.dateIn,
        dateOut: this.dateOut
      });
    }
  },
  mounted() {
    this.viewProvider();
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
