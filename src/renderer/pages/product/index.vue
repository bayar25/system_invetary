<template>
  <div class="product">
    <section class="hero is-info">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Producto
          </h1>
        </div>
      </div>
    </section>
    <div class="productPag" alt="Max-width 90%">
      <div class="container">
        <div class="section">
          <div class="container">
            <h1 class="title">Formulario de Producto</h1>
          </div>
          <div class="section">
            <div class="field">
              <b-field label="Producto">
                <b-input type="text" placeholder="Ingresar" v-model="name" />
              </b-field>
            </div>
            <div class="columns">
              <div class="column">
                <b-field label="Marca">
                  <b-select
                    placeholder="Seleccionar"
                    v-model="idBrand"
                    expanded
                  >
                    <option
                      v-for="option in getListBrand"
                      :value="option.id"
                      :key="option.id"
                    >
                      {{ option.name }}
                    </option>
                  </b-select>
                </b-field>
              </div>
              <div class="column">
                <b-field label="Categoria">
                  <b-select
                    placeholder="Seleccionar"
                    v-model="idCategory"
                    expanded
                  >
                    <option
                      v-for="option in getListCategory"
                      :value="option.id"
                      :key="option.id"
                    >
                      {{ option.name }}
                    </option>
                  </b-select>
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
          </div>
        </div>
        <div class="section">
          <div class="container">
            <h1 class="title">Lista de Productos</h1>
          </div>
          <div class="section">
            <b-table :data="getListProduct" :striped="true">
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
                label="Producto"
                width="30%"
                centered
                v-slot="props"
              >
                {{ props.row.name }}
              </b-table-column>
              <b-table-column
                field="brand"
                label="Marca"
                width="15%"
                centered
                v-slot="props"
              >
                {{ props.row.nameBrand }}
              </b-table-column>
              <b-table-column
                field="category"
                label="Categoria"
                width="10%"
                centered
                v-slot="props"
              >
                {{ props.row.nameCategory }}
              </b-table-column>
               <b-table-column
                field="price"
                label="Precio"
                width="10%"
                numeric
                centered
                v-slot="props"
              >
                {{ props.row.price }}
              </b-table-column>
               <b-table-column
                field="stock"
                label="Existencias"
                width="10%"
                numeric
                centered
                v-slot="props"
              >
                {{ props.row.stock }}
              </b-table-column>
              <b-table-column
                field="options"
                label="Opciones"
                width="15%"
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import types from "../../../types/product/product.js";
import typesBrand from "../../../types/product/brand.js";
import typesCategory from "../../../types/product/category.js";

export default {
  computed: {
    ...mapGetters({
      getTypeQuery: types.getters.getTypeQuery,
      getProduct: types.getters.getProduct,
      getUpProduct: types.getters.getUpProduct,
      getIdBrand: types.getters.getIdBrand,
      getIdCategory: types.getters.getIdCategory,
      getActiveProduct: types.getters.getActiveProduct,
      getListProduct: types.getters.getListProduct,
      getListBrand: typesBrand.getters.getListBrand,
      getListCategory: typesCategory.getters.getListCategory
    }),
    name: {
      get: function() {
        return this.getProduct;
      },
      set: function(val) {
        this.setProduct(val);
      }
    },
    idBrand: {
      get: function() {
        return this.getIdBrand;
      },
      set: function(val) {
        this.setIdBrand(val);
      }
    },
    idCategory: {
      get: function() {
        return this.getIdCategory;
      },
      set: function(val) {
        this.setIdCategory(val);
      }
    },
    // TODO: quitar y pasar a la store
    valid() {
      if (this.getTypeQuery == "add") {
        return (
          !!this.getActiveProduct &&
          !(this.name == this.getUpProduct) &&
          this.getIdBrand != 0 &&
          this.getIdCategory != 0
        );
      } else if (this.getTypeQuery == "update") {
        return (
          !!this.getActiveProduct &&
          (!(this.name == this.getUpProduct) ||
            this.getIdBrand != 0 ||
            this.getIdCategory != 0)
        );
      }
    },
    label() {
      if (this.getTypeQuery == "add") {
        return "Agregar";
      } else if (this.getTypeQuery == "update") {
        return "Actualizar";
      }
    }
  },
  methods: {
    ...mapActions({
      add: types.actions.addProduct,
      up: types.actions.upProduct,
      del: types.actions.delProduct,
      viewProduct: types.actions.viewProduct,
      viewBrand: typesBrand.actions.viewBrand,
      viewCategory: typesCategory.actions.viewCategory,
      resetProduct: types.actions.resetProduct
    }),
    ...mapMutations({
      setTypeQuery: types.mutations.setTypeQuery,
      setIdProduct: types.mutations.setIdProduct,
      setProduct: types.mutations.setProduct,
      setUpProduct: types.mutations.setUpProduct,
      setIdBrand: types.mutations.setIdBrand,
      setIdCategory: types.mutations.setIdCategory
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
      this.setIdProduct(dt.id);
      this.setProduct(dt.name);
      this.setUpProduct(dt.name);
      this.setIdBrand(dt.idBrand);
      this.setIdCategory(dt.idCategory);
      this.up();
    },
    deleteClick(dt) {
      this.setTypeQuery("delete");
      this.del(dt);
    },
    cancel() {
      this.resetProduct();
    }
  },
  mounted() {
    this.viewProduct();
    this.viewBrand();
    this.viewCategory();
  }
};
</script>
<style>
.product {
  display: grid;
  grid-template-rows: auto 1fr;
}
.productPag {
  overflow: auto;
}
</style>
