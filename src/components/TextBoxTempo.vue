<template>
  <div>
    <input type="number" v-model="tempo" label="BPM">
  </div>
</template>

<script>
export default {
  name: "TextBoxTempo",
  computed: {
    tempo: {
      get() {
        return this.$store.state.tempo.value;
      },
      set(value) {
        this.$store.commit("tempo/updateTempo", value);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
} */
</style>
