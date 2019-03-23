<template>
  <div id="app">
    <h1>めとろのーむ</h1>
    <img alt="Vue logo" src="./assets/logo.png">
    <text-box-tempo/>
    <ButtonStartStop/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TextBoxTempo from "./components/TextBoxTempo.vue";
import ButtonStartStop from "./components/ButtonStartStop.vue";

export default Vue.extend({
  name: "app",
  components: {
    TextBoxTempo,
    ButtonStartStop
  },
});
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
