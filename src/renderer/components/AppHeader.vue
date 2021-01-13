<template>
  <header id="appHeader">
    <nav class="menu">
      <ul class="menu-list">
        <li class="menu-item-color">
          <nuxt-link class="link" to="/report/">
            <i class="fas fa-home"></i>
            <h1>Inicio</h1>
          </nuxt-link>
        </li>
        <li class="menu-item-color">
          <a class="link" @click="openPurchase()">
            <i class="fas fa-truck-loading"></i>
            <h1>Compras</h1>
          </a>
          <ul v-if="opPurchase">
            <li><nuxt-link to="/purchase/">Agregar</nuxt-link></li>
            <li><nuxt-link to="/purchase/viewPurchase">Ver</nuxt-link></li>
            <li><nuxt-link to="/purchase/provider">Proveedores</nuxt-link></li>
          </ul>
        </li>
        <li class="menu-item-color">
          <a class="link" @click="openProduct()">
            <i class="fas fa-boxes"></i>
            <h1>Productos</h1>
          </a>
          <ul v-if="opProduct">
            <li><nuxt-link to="/product/">Agregar</nuxt-link></li>
            <li><nuxt-link to="/product/brand">Marcas</nuxt-link></li>
            <li><nuxt-link to="/product/category">Categorias</nuxt-link></li>
          </ul>
        </li>
        <li class="menu-item-color">
          <a class="link" @click="openSale()">
            <i class="fas fa-shopping-cart"></i>
            <h1>Ventas</h1>
          </a>
          <ul v-if="opSale">
            <li><nuxt-link to="/">Agregar</nuxt-link></li>
            <li><nuxt-link to="/">Ver</nuxt-link></li>
          </ul>
        </li>
        <li class="menu-item-color">
          <nuxt-link class="link" to="/report/">
            <i class="fas fa-file-invoice-dollar"></i>
            <h1>Informes</h1>
          </nuxt-link>
        </li>
        <li class="menu-item-color">
          <nuxt-link class="link" to="/">
            <i class="fas fa-cogs"></i>
            <h1>Configuración</h1>
          </nuxt-link>
        </li>
      </ul>
    </nav>
  </header>
</template>
<script>
export default {
  data() {
    return {
      opPurchase: false,
      opSale: false,
      opProduct: false
    };
  },
  methods: {
    openPurchase() {
      this.opPurchase = !this.opPurchase;
    },
    openSale() {
      this.opSale = !this.opSale;
    },
    openProduct() {
      this.opProduct = !this.opProduct;
    }
  }
};
</script>
<style scoped>
#appHeader {
  height: 100vh;
  grid-column: 1;
  grid-row: 1;
  display: flex;
  background:hsl(0, 0%, 96%);
  padding: 20px 10px;
}
.link > h1 {
  display: inline-block;
  margin-left: 5px;
}

a {
  margin: 0;
}
</style>
