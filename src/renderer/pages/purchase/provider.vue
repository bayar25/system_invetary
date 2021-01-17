<template>
  <div class="provider">
    <section class="hero is-info">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Proveedores
          </h1>
        </div>
      </div>
    </section>
    <div class="providerPag" alt="Max-width 90%">
      <section class="section">
        <div class="container">
          <h1 class="title">Formulario de Proveedores</h1>
        </div>
        <section class="section">
          <div class="columns">
            <div class="column">
              <b-field label="Proveedor">
                <b-input
                  type="text"
                  placeholder="Ingresar Nombre"
                  v-model="name"
                  maxlength="200"
                />
              </b-field>
            </div>
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
          <h1 class="title">Lista de Proveedor</h1>
        </div>
        <section class="section">
          <b-table :data="getListProvider" :striped="true">
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
              width="40%"
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
import types from "../../../types/purchase/provider.js";

export default {
  computed: {
    ...mapGetters({
      getTypeQuery: types.getters.getTypeQuery,
      getProvider: types.getters.getProvider,
      getUpProvider: types.getters.getUpProvider,
      getActiveProvider: types.getters.getActiveProvider,
      getListProvider: types.getters.getListProvider,
      valid:types.getters.getValidProvider
    }),
    name: {
      get: function() {
        return this.getProvider;
      },
      set: function(val) {
        this.setProvider(val);
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
      add: types.actions.addProvider,
      up: types.actions.upProvider,
      del: types.actions.delProvider,
      viewProvider: types.actions.viewProvider,
      resetProvider: types.actions.resetProvider
    }),
    ...mapMutations({
      setTypeQuery: types.mutations.setTypeQuery,
      setIdProvider: types.mutations.setIdProvider,
      setProvider: types.mutations.setProvider,
      setUpProvider: types.mutations.setUpProvider
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
      this.setIdProvider(dt.id);
      this.setProvider(dt.name);
      this.setUpProvider(dt.name);
      this.up();
    },
    deleteClick(dt) {
      this.setTypeQuery("delete");
      this.del(dt);
    },
    cancel() {
      this.resetProvider();
    }
  },
  mounted() {
    this.resetProvider();
    this.viewProvider();
  }
};
</script>
<style>
.provider {
  display: grid;
  grid-template-rows: auto 1fr;
}
.providerPag {
  overflow: auto;
}
</style>
