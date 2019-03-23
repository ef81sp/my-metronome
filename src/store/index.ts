import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const tempo = {
  namespaced: true,
  state: {
    value: 60
  },
  mutations: {
    updateTempo(state: any, value: Number) {
      state.value = value
    }
  }
};

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    tempo
  }
});
