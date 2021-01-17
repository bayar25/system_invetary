<template lang="">
  <div class="purchase">
    <section class="hero is-info">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Compras
          </h1>
        </div>
      </div>
    </section>
    <div class="purchasePag">
      <section class="section">
        <div class="container">
          <h1 class="title">Formulario de Compra</h1>
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
            <div class="column">
              <b-field label="Fecha">
                <b-input type="Date" placeholder="Ingresar" v-model="date" />
              </b-field>
            </div>
          </div>
        </section>
        <div class="container">
          <h1 class="title">Formulario de Detalle de Compra</h1>
        </div>
        <section class="section">
          <div class="columns">
            <InputSearch
              class="column is-three-quarters"
              :value="dtProduct"
              @select="searchResp"
              :disabled="upDt"
            />
            <div class="column">
              <b-field label="Cantidad">
                <b-input
                  type="number"
                  placeholder="Ingresar"
                  v-model="quantity"
                />
              </b-field>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <b-field label="Precio">
                <b-input
                  type="number"
                  placeholder="Ingresar"
                  v-model="pricePurchase"
                />
              </b-field>
            </div>
            <div class="column">
              <b-field label="Precio Venta">
                <b-input
                  type="number"
                  placeholder="Ingresar"
                  v-model="priceSale"
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
            <b-button
              type="is-link"
              label="Agregar"
              @click="addDtList"
              :disabled="!valid"
            />
            <b-button type="is-danger" label="Cancelar" @click="dtCancel" />
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
              width="33%"
              centered
              v-slot="props"
            >
              {{ props.row.product }}
            </b-table-column>
            <b-table-column
              field="pricePurchase"
              label="Compra"
              width="10%"
              centered
              v-slot="props"
            >
              {{ props.row.pricePurchase }}
            </b-table-column>
            <b-table-column
              field="priceSale"
              label="Venta"
              width="10%"
              centered
              v-slot="props"
            >
              {{ props.row.priceSale }}
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
              width="10%"
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
            <template #footer>
              <th class="is-hidden-mobile" style="width:5%;"></th>
              <th class="is-hidden-mobile" style="width:33%;"></th>
              <th class="is-hidden-mobile" style="width:10%;"></th>
              <th class="is-hidden-mobile" style="width:10%;"></th>
              <th class="is-hidden-mobile" style="width:10%;">
                <div class="th-wrap is-centered">Total:</div>
              </th>
              <th class="is-hidden-mobile" style="width:10%;">
                <div class="th-wrap is-centered">{{ total }}</div>
              </th>
              <th class="is-hidden-mobile" style="width:12%;"></th>
            </template>
          </b-table>
        </section>
        <section class="section">
          <div class="buttons level-right">
            <b-button type="is-link" label="Agregar" @click="clickPurchase" />
            <b-button type="is-danger" label="Cancelar" @click="clickCancel" />
          </div>
        </section>
      </section>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import types from "../../../types/purchase/purchase.js";
import typesProviders from "../../../types/purchase/provider.js";

import InputSearch from "@/components/InputSearch";

export default {
  data() {
    return {
      dtId: 0,
      dtIdLot: 0,
      dtIdInventory: 0,
      dtIdProduct: "",
      dtProduct: "",
      quantity: "",
      upQuantity: "",
      sotck: 0,
      pricePurchase: "",
      priceSale: "",
      dtTotal: "",
      upDt: false
    };
  },
  components: { InputSearch },
  watch: {
    pricePurchase: function(val) {
      this.dtTotal = val * this.quantity;
    },
    quantity: function(val) {
      this.dtTotal = val * this.pricePurchase;
    }
  },
  computed: {
    ...mapGetters({
      listProvider: typesProviders.getters.getListProvider,
      getIdPurchase: typesProviders.getters.getIdPurchase,
      getIdProvider: types.getters.getIdProvider,
      getDate: types.getters.getDate,
      getTotal: types.getters.getTotal,
      getListDt: types.getters.getListDt,
      getOption: types.getters.getOption
    }),
    DtList: {
      get: function() {
        return this.getListDt;
      }
    },
    idProvider: {
      get: function() {
        return this.getIdProvider;
      },
      set: function(val) {
        this.setIdProvider(val);
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
        this.setTotal(val);
      }
    },
    valid: {
      get: function() {
        let valid =
          this.dtId == 0 &&
          this.dtIdLot == 0 &&
          this.dtIdInventory > 0 &&
          this.dtIdProduct > 0 &&
          this.dtProduct != "" &&
          this.quantity > 0 &&
          this.pricePurchase > 0 &&
          this.priceSale > 0 &&
          this.dtTotal > 0;

        let validUp =
          this.dtId != 0 &&
          this.dtIdLot != 0 &&
          this.dtProduct != "" &&
          this.quantity != 0 &&
          this.pricePurchase != 0 &&
          parseFloat(this.pricePurchase) < parseFloat(this.priceSale) &&
          this.priceSale != 0 &&
          this.dtTotal != 0;
        console.log(
          parseFloat(this.pricePurchase) < parseFloat(this.priceSale)
        );
        if (!this.upDt) {
          return (
            valid && parseFloat(this.pricePurchase) < parseFloat(this.priceSale)
          );
        } else {
          return validUp && parseInt(this.sotck) >= parseInt(this.upQuantity) - parseInt(this.quantity);
        }
      }
    }
  },
  methods: {
    ...mapActions({
      viewProvider: typesProviders.actions.viewProvider,
      ChangeDtPurchase: types.actions.ChangeDtPurchase,
      addPurchase: types.actions.addPurchase,
      upPurchase: types.actions.upPurchase
    }),
    ...mapMutations({
      setListDt: types.mutations.setListDt,
      setIdProvider: types.mutations.setIdProvider,
      setDate: types.mutations.setDate,
      setTotal: types.mutations.setTotal,
      setReset: types.mutations.setReset
    }),
    addDtList() {
      let dt = {
        id: this.dtId,
        idPurchase: this.getIdPurchase,
        idLot: this.dtIdLot,
        idProduct: this.dtIdProduct,
        idInventory: this.dtIdInventory,
        product: this.dtProduct,
        quantity: this.quantity,
        pricePurchase: this.pricePurchase,
        priceSale: this.priceSale,
        total: this.dtTotal
      };
      this.typeDtQuery = "add";
      this.ChangeDtPurchase({ dt: dt, option: "add" });
      this.dtCancel();
    },
    clickPurchase() {
      if (this.getOption == "add") {
        this.addPurchase();
      } else if (this.getOption == "up") {
        this.upPurchase();
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
      this.dtIdInventory = prod.idInventory;
      this.dtProduct = prod.name;
      this.priceSale = prod.price;
      this.sotck = prod.stock;
    },
    dtCancel() {
      this.dtId = 0;
      this.dtIdLot = 0;
      this.dtIdInventory = 0;
      this.dtIdProduct = "";
      this.dtProduct = "";
      this.quantity = "";
      this.upQuantity = 0;
      this.sotck = 0;
      this.pricePurchase = "";
      this.priceSale = "";
      this.dtTotal = "";
      this.typeDtQuery = "add";
      this.upDt = false;
    },
    up(dt) {
      this.dtId = dt.id;
      this.dtIdLot = dt.idLot;
      this.dtIdInventory = dt.idInventory;
      this.dtIdProduct = dt.idProduct;
      this.dtProduct = dt.product;
      this.quantity = dt.quantity;
      this.upQuantity = dt.quantity;
      this.pricePurchase = dt.pricePurchase;
      this.priceSale = dt.priceSale;
      this.typeDtQuery = "update";
      this.upDt = true;
    },
    del(dt) {
      this.ChangeDtPurchase({ dt: dt, option: "delete" });
      this.dtCancel();
      this.upDt = false;
    }
  },
  mounted() {
    this.viewProvider();
    this.dtCancel();
  }
};
</script>
