import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 10
  },
  getters: {
    times2(state){
      return state.counter * 2
    }
  },
  mutations: {
    //Change and update the state
    setCounter(state, value){
      state.counter = value;
    }
  },
  actions: {},
  modules: {}
})
