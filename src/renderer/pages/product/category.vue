<template>
  <div class="category">
    <section class="hero is-info">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Categoría
          </h1>
        </div>
      </div>
    </section>
    <div class="categoryPag" alt="Max-width 90%">
      <section class="section">
        <div class="container">
          <h1 class="title">Formulario de Categoría</h1>
        </div>
        <section class="section">
          <div class="field">
            <b-field label="Categoría">
              <b-input type="text" placeholder="Ingresar" v-model="name" maxlength="45"/>
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
          <h1 class="title">Lista de Categoría</h1>
        </div>
        <section class="section">
          <b-table :data="getListCategory" :striped="true">
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
              label="Categoria"
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
import types from "../../../types/product/category.js";

export default {
  computed: {
    ...mapGetters({
      getTypeQuery: types.getters.getTypeQuery,
      getCategory: types.getters.getCategory,
      getUpCategory: types.getters.getUpCategory,
      getListCategory: types.getters.getListCategory,
      valid:types.getters.getValidCategory
    }),
    name: {
      get: function() {
        return this.getCategory;
      },
      set: function(val) {
        this.setCategory(val);
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
      add: types.actions.addCategory,
      up: types.actions.upCategory,
      del: types.actions.delCategory,
      viewCategory: types.actions.viewCategory,
      resetCategory: types.actions.resetCategory
    }),
    ...mapMutations({
      setTypeQuery: types.mutations.setTypeQuery,
      setIdCategory: types.mutations.setIdCategory,
      setCategory: types.mutations.setCategory,
      setUpCategory: types.mutations.setUpCategory
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
      this.setIdCategory(dt.id);
      this.setCategory(dt.name);
      this.setUpCategory(dt.name);
      this.up();
    },
    deleteClick(dt) {
      this.setTypeQuery("delete");
      this.del(dt);
    },
    cancel() {
      this.resetCategory();
    }
  },
  mounted() {
    this.resetCategory();
    this.viewCategory();
  }
};
</script>
<style>
.category {
  display: grid;
  grid-template-rows: auto 1fr;
}
.categoryPag {
  overflow: auto;
}
</style>
