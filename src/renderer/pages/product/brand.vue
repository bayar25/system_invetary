<template>
  <div class="brand">
    <section class="hero is-info">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Marca
          </h1>
        </div>
      </div>
    </section>
    <div class="brandPag" alt="Max-width 90%">
      <section class="section">
        <div class="container">
          <h1 class="title">Formulario de Marca</h1>
        </div>
        <section class="section">
          <div class="field">
            <b-field label="Marca">
              <b-input type="text" placeholder="Ingresar" v-model="name" maxlength="40"/>
            </b-field>
          </div>
          <div class="buttons level-right">
            <b-button
              type="is-link"
              :label="label"
              @click="clickOk"
              :disabled="!valid"
            />
            <b-button type="is-danger" label="Cancelar" @click="cancel" />
          </div>
        </section>
      </section>
      <section class="section">
        <div class="container">
          <h1 class="title">Lista de Marcas</h1>
        </div>
        <section class="section">
          <b-table :data="getListBrand" :striped="true">
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
              field="first_name"
              label="Marca"
              width="60%"
              centered
              v-slot="props"
            >
              {{ props.row.name }}
            </b-table-column>
            <b-table-column
              field="first_name"
              label="Opciones"
              width="30%"
              centered
              v-slot="props"
            >
              <b-button type="is-success" @click="updateClick(props.row)">
                <i
                  class="justify-content-center fas fa-pen text-success d-flex"
                ></i
              ></b-button>
              <b-button type="is-danger" @click="deleteClick(props.row)">
                <i
                  class="d-flex justify-content-center fas fa-trash text-danger"
                ></i
              ></b-button>
            </b-table-column>
          </b-table>
        </section>
      </section>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import types from "../../../types/product/brand.js";

export default {
  computed: {
    ...mapGetters({
      getTypeQuery: types.getters.getTypeQuery,
      getBrand: types.getters.getBrand,
      getUpBrand: types.getters.getUpBrand,
      getListBrand: types.getters.getListBrand,
      valid:types.getters.getValidBrand
    }),
    name: {
      get: function() {
        return this.getBrand;
      },
      set: function(val) {
        this.setBrand(val);
      }
    },
    label() {
      if (this.getTypeQuery == "add") {
        return "Agregar";
      } else if (this.getTypeQuery == "update") {
        return "Actualizar";
      } else {
        return "Agregar";
      }
    }
  },
  methods: {
    ...mapActions({
      add: types.actions.addBrand,
      up: types.actions.upBrand,
      del: types.actions.delBrand,
      viewBrand: types.actions.viewBrand,
      resetBrand: types.actions.resetBrand
    }),
    ...mapMutations({
      setTypeQuery: types.mutations.setTypeQuery,
      setIdBrand: types.mutations.setIdBrand,
      setBrand: types.mutations.setBrand,
      setUpBrand: types.mutations.setUpBrand
    }),
    clickOk() {
      if (this.getTypeQuery == "add") {
        this.add();
      } else if (this.getTypeQuery == "update") {
        this.up();
      }
    },
    updateClick(dt) {
      this.setTypeQuery("update");
      this.setIdBrand(dt.id);
      this.setBrand(dt.name);
      this.setUpBrand(dt.name);
      this.up();
    },
    deleteClick(dt) {
      this.setTypeQuery("delete");
      this.del(dt);
    },
    cancel() {
      this.resetBrand();
    }
  },
  mounted() {
    this.resetBrand();
    this.viewBrand();
  }
};
</script>
<style>
.brand {
  display: grid;
  grid-template-rows: auto 1fr;
}
.brandPag {
  overflow: auto;
}
</style>
