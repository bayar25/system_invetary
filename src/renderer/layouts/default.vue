<template>
  <div id="app">
    <AppHeader />
    <div id="pag">
      <nuxt />
    </div>
  </div>
</template>
<script>
import AppHeader from "@/components/AppHeader.vue";
export default {
  components: { AppHeader }
};
</script>
<style>
html {
  overflow-y: hidden !important;
}
body {
  margin: 0 !important;
  background-color: white;
}
#app {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 100%;
  width: 100%;
  height: 100%;
  font-family: Helvetica, sans-serif;
}
#pag {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
  overflow: auto;
}
#pag::-webkit-scrollbar {
    width: 8px;     /* Tamaño del scroll en vertical */
    height: 8px;    /* Tamaño del scroll en horizontal */
}
/* Ponemos un color de fondo y redondeamos las esquinas del thumb */
#pag::-webkit-scrollbar-thumb {
    background:hsl(0, 0%, 21%);
}
/* Cambiamos el fondo y agregamos una sombra cuando esté en hover */
#pag::-webkit-scrollbar-thumb:hover {
    background: #ffffff;
    box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
}
/* Cambiamos el fondo cuando esté en active */
#pag::-webkit-scrollbar-thumb:active {
    background-color: #ffffff;
}
/* Ponemos un color de fondo y redondeamos las esquinas del track */
#pag::-webkit-scrollbar-track {
    background: #ffffff;
    border-radius: 4px;
}
/* Cambiamos el fondo cuando esté en active o hover */
#pag::-webkit-scrollbar-track:hover,
#pag::-webkit-scrollbar-track:active {
  background: #d4d4d4;
}
</style>
