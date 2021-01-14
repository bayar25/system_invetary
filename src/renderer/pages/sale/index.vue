<template lang="">
  <div class="purchase">
    <section class="hero is-info">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Ventas
          </h1>
        </div>
      </div>
    </section>
    <div class="purchasePag">
      <section class="section">
        <div class="container">
          <h1 class="title">Formulario de Venta</h1>
        </div>
        <section class="section">
          <div class="columns">
            <div class="column">
              <b-field label="Codigo">
                <b-input type="text" placeholder="Ingresar" v-model="code" />
              </b-field>
            </div>
            <div class="column is-half">
              <b-field label="Cliente">
                <b-input type="text" placeholder="Ingresar" v-model="client" />
              </b-field>
            </div>
            <div class="column">
              <b-field label="Fecha">
                <b-input type="date" placeholder="Ingresar" v-model="date" />
              </b-field>
            </div>
          </div>
        </section>
        <div class="container">
          <h1 class="title">Formulario de Detalle de Venta</h1>
        </div>
        <section class="section">
          <div class="columns">
            <InputSearch
              class="column is-half"
              :value="dtProduct"
              @select="searchResp"
            />
            <div class="column">
              <b-field label="Existencia">
                <b-input
                  type="number"
                  placeholder="0"
                  v-model="stock"
                  disabled
                />
              </b-field>
            </div>
            <div class="column">
              <b-field label="Cantidad">
                <b-input type="number" placeholder="0" v-model="quantity" />
              </b-field>
            </div>
            <div class="column">
              <b-field label="Precio">
                <b-input
                  type="number"
                  placeholder="0"
                  v-model="price"
                  disabled
                />
              </b-field>
            </div>
            <div class="column">
              <b-field label="Total">
                <b-input
                  type="number"
                  placeholder="0"
                  disabled
                  v-model="dtTotal"
                />
              </b-field>
            </div>
          </div>
          <div class="buttons level-right">
            <b-button type="is-link" label="Agregar" @click="addDtList" />
            <b-button type="is-danger" label="Cancelar" />
          </div>
          <b-table :data="DtList" :striped="true">
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
              field="product"
              label="Producto"
              width="38%"
              centered
              v-slot="props"
            >
              {{ props.row.product }}
            </b-table-column>
            <b-table-column
              field="priceSale"
              label="Precio"
              width="10%"
              centered
              v-slot="props"
            >
              {{ props.row.price }}
            </b-table-column>
            <b-table-column
              field="priceSale"
              label="Cantidad"
              width="10%"
              centered
              v-slot="props"
            >
              {{ props.row.quantity }}
            </b-table-column>
            <b-table-column
              field="priceSale"
              label="Total"
              width="15%"
              centered
              v-slot="props"
            >
              {{ props.row.total }}
            </b-table-column>
            <b-table-column
              field="first_name"
              label="Opciones"
              width="12%"
              centered
              v-slot="props"
            >
              <div>
                <b-button type="is-success" @click="up(props.row)">
                  <i class="fas fa-pen"></i
                ></b-button>
                <b-button type="is-danger" @click="del(props.row)">
                  <i class="fas fa-trash"></i
                ></b-button>
              </div>
            </b-table-column>
          </b-table>
        </section>
        <section class="section">
          <div class="columns">
            <div class="column is-three-quarters"></div>
            <div class="column">
              <b-field label="Total">
                <b-input
                  type="number"
                  placeholder="0"
                  disabled
                  :value="total"
                />
              </b-field>
              <b-field label="Efectivo">
                <b-input type="number" placeholder="Ingresar" v-model="cash" />
              </b-field>
              <b-field label="Cambio">
                <b-input
                  type="number"
                  placeholder="0"
                  disabled
                  :value="getChange"
                />
              </b-field>
            </div>
          </div>
        </section>
        <section class="section">
          <div class="buttons level-right">
            <b-button type="is-success" label="Generar Factura" @click="reportSale" v-if="this.getOption == 'up'" />
            <b-button type="is-link" label="Agregar" @click="clickSale" />
            <b-button type="is-danger" label="Cancelar" @click="clickCancel" />
          </div>
        </section>
      </section>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import types from "../../../types/sale/sale.js";

import InputSearch from "@/components/InputSearch";

export default {
  data() {
    return {
      dtId: 0,
      dtIdProduct: "",
      dtProduct: "",
      quantity: "",
      stock: "",
      price: "",
      dtTotal: ""
    };
  },
  components: { InputSearch },
  watch: {
    price: function(val) {
      this.dtTotal = val * this.quantity;
    },
    quantity: function(val) {
      if (val > this.stock) {
        this.quantity = this.stock;
      } else if (val < 0) {
        this.quantity = 0;
      }
      this.dtTotal = val * this.price;
    }
  },
  computed: {
    ...mapGetters({
      getIdSale: types.getters.getIdSale,
      getCode: types.getters.getCode,
      getClient: types.getters.getClient,
      getDate: types.getters.getDate,
      getTotal: types.getters.getTotal,
      getCash: types.getters.getCash,
      getChange: types.getters.getChange,
      getListDt: types.getters.getListDt,
      getOption: types.getters.getOption
    }),
    DtList: {
      get: function() {
        return this.getListDt;
      }
    },
    code: {
      get: function() {
        return this.getCode;
      },
      set: function(val) {
        this.setCode(val);
      }
    },
    client: {
      get: function() {
        return this.getClient;
      },
      set: function(val) {
        this.setClient(val);
      }
    },
    date: {
      get: function() {
        return this.getDate;
      },
      set: function(val) {
        this.setDate(val);
      }
    },
    total: {
      get: function() {
        return this.getTotal;
      },
      set: function(val) {
        this.setChange(this.cash - val);
        this.setTotal(val);
      }
    },
    cash: {
      get: function() {
        return this.getCash;
      },
      set: function(val) {
        this.setChange(val - this.total);
        this.setCash(val);
      }
    }
  },
  methods: {
    ...mapActions({
      ChangeDtSale: types.actions.ChangeDtSale,
      addSale: types.actions.addSale,
      upSale: types.actions.upSale,
      reportSale:types.actions.reportSale
    }),
    ...mapMutations({
      setListDt: types.mutations.setListDt,
      setCode: types.mutations.setCode,
      setClient: types.mutations.setClient,
      setDate: types.mutations.setDate,
      setTotal: types.mutations.setTotal,
      setCash: types.mutations.setCash,
      setChange: types.mutations.setChange,
      setReset: types.mutations.setReset
    }),
    addDtList() {
      let dt = {
        id: this.dtId,
        idSale: this.getIdSale,
        idProduct: this.dtIdProduct,
        product: this.dtProduct,
        quantity: this.quantity,
        price: this.price,
        total: this.dtTotal
      };
      this.ChangeDtSale({ dt: dt, option: "add" });
      this.dtCancel();
    },
    clickSale() {
      if (this.getOption == "add") {
        this.addSale();
      } else if (this.getOption == "up") {
        this.upSale();
        this.$router.push("/purchase/viewPurchase");
      }
    },
    clickCancel() {
      let op = this.getOption;
      this.setReset();
      if (op == "up") {
        this.$router.push("/purchase/viewPurchase");
      }
    },
    searchResp(prod) {
      this.dtIdProduct = prod.id;
      this.dtProduct = prod.name;
      this.price = prod.price;
      this.stock = prod.stock;
    },
    dtCancel() {
      this.dtId = 0;
      this.dtIdProduct = "";
      this.dtProduct = "";
      this.quantity = "";
      this.price = "";
      this.stock = "";
      this.dtTotal = "";
    },
    up(dt) {
      this.dtId = dt.id;
      this.dtIdProduct = dt.idProduct;
      this.dtProduct = dt.product;
      this.quantity = dt.quantity;
      this.price = dt.price;
    },
    del(dt) {
      this.ChangeDtPurchase({ dt: dt, option: "delete" });
    }
  }
};
</script>
