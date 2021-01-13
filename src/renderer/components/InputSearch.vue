<template>
  <section>
    <b-field label="Buscar Producto">
      <b-autocomplete
        v-model="name"
        :data="filterDt"
        placeholder="Buscar"
        clearable
        @select="option => (selected = option)"
      >
        <template #empty>No results found</template>
      </b-autocomplete>
    </b-field>
  </section>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import types from "../../types/product/product.js";

export default {
  data() {
    return {
      name: "",
      selected: null,
      listProduct: []
    };
  },
  props: ["value"],
  methods: {
    ...mapActions({ view: types.actions.viewProductSearch })
  },
  computed: {
    ...mapGetters({ list: types.getters.getListProductSearch }),
    filterDt: {
      get: function() {
        let dt = [];
        this.list.forEach(prods => {
          dt.push(prods.name);
        });
        return dt;
      }
    }
  },
  watch: {
    name: function(val) {
      this.view(val);
    },
    selected: function(val) {
      this.list.forEach(prods => {
        if (prods.name == val) {
          this.$emit("select", prods);
        }
      });
    },
    value: function(val) {
      this.name = val;
    }
  }
};
</script>
