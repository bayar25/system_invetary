<template>
  <div class="TableHistoryPurchase section">
    <b-table :data="getDataReport" :striped="true">
      <b-table-column field="id" label="Id" width="3%" numeric v-slot="props">
        {{ props.index + 1 }}
      </b-table-column>

      <b-table-column
        field="product"
        label="Producto"
        width="26%"
        centered
        v-slot="props"
      >
        {{ props.row.product }}
      </b-table-column>
      <b-table-column
        field="pricePurchase"
        label="Precio de Compra"
        width="9%"
        centered
        v-slot="props"
      >
        {{ formatCord(props.row.pricePurchase) }}
      </b-table-column>
      <b-table-column
        field="priceSale"
        label="Precio de Venta"
        width="9%"
        centered
        v-slot="props"
      >
        {{ formatCord(props.row.priceSale) }}
      </b-table-column>
      <b-table-column
        field="quantityPurchase"
        label="Cantidad Comprada"
        width="9%"
        centered
        v-slot="props"
      >
        {{ props.row.quantityPurchase }}
      </b-table-column>
      <b-table-column
        field="stock"
        label="Cantidad en Inventario"
        width="9%"
        centered
        v-slot="props"
      >
        {{ props.row.stock }}
      </b-table-column>
      <b-table-column
        field="quantitySale"
        label="Cantidad vendida"
        width="9%"
        centered
        v-slot="props"
      >
        {{ props.row.quantitySale }}
      </b-table-column>
      <b-table-column
        field="totalDtSale"
        label="Total de Compras"
        width="9%"
        centered
        v-slot="props"
      >
        {{ formatCord(props.row.totalDtPurchase) }}
      </b-table-column>
      <b-table-column
        field="totalInventary"
        label="Total en Inventario"
        width="9%"
        centered
        v-slot="props"
      >
        {{ formatCord(props.row.stock * props.row.priceSale) }}
      </b-table-column>
      <b-table-column
        field="totalDtSale"
        label="Total de Ventas"
        width="9%"
        centered
        v-slot="props"
      >
        {{ formatCord(props.row.totalDtSale) }}
      </b-table-column>
    </b-table>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import types from "../../../types/report/report.js";

import { formatMoney } from "../../../utils/formateMoney.js";

export default {
  computed: {
    ...mapGetters({
      getDataReport: types.getters.getDataReport
    })
  },
  methods: {
    formatCord(value) {
      return formatMoney(value);
    }
  }
};
</script>
