<template>
  <div class="TableHistoryPurchase section">
    <b-table :data="getDataReport" :striped="true">
      <b-table-column field="id" label="Id" width="5%" numeric v-slot="props">
        {{ props.index + 1 }}
      </b-table-column>
      <b-table-column
        field="product"
        label="Producto"
        width="50%"
        centered
        v-slot="props"
      >
        {{ props.row.product }}
      </b-table-column>
      <b-table-column
        field="pricePurchase"
        label="Precio Compra"
        width="15%"
        centered
        v-slot="props"
      >
        {{ formatCord(props.row.pricePurchase) }}
      </b-table-column>
      <b-table-column
        field="quantityPurchase"
        label="Cantidad"
        width="15%"
        centered
        v-slot="props"
      >
        {{ props.row.quantityPurchase }}
      </b-table-column>
      <b-table-column
        field="totalDtPurchase"
        label="Total"
        width="15%"
        centered
        v-slot="props"
      >
        {{ formatCord(props.row.totalDtPurchase) }}
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
