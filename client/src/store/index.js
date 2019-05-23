import Vue from 'vue'
import Vuex from 'vuex'
import VuexI18n from 'vuex-i18n' // load vuex i18n module

import app from './modules/app'

import * as getters from './getters'

import axios from '../services/axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true, // process.env.NODE_ENV !== 'production',
  getters,
  modules: {
    app
  },
  state: {
    Me: null,
    Team: {},
    AllResults: [],
    Que: [],
    Newer: []
  },
  mutations: {
    setMe (state, data) {
      state.Me = data
    },
    setTeam (state, data) {
      state.Team = data
    },
    setAllResults (state, data) {
      state.AllResults = data
    },
    setQue (state, data) {
      state.Que = data
    },
    setNewer (state, data) {
      state.Newer = data
    }
  },
  actions: {
    async getData ({commit}) {
      const me = await axios.get('/api/public/whoami').then(data => { commit('setMe', data.data); return data.data })
      axios.get('/api/public/results').then(data => commit('setAllResults', data.data))
      axios.get('/api/public/newer').then(data => commit('setNewer', data.data))

      if (me.user_id === '-') return
      axios.get('/api/internal/team').then(data => commit('setTeam', data.data))
      axios.get('/api/internal/que').then(data => commit('setQue', data.data))
    }
  }
})

Vue.use(VuexI18n.plugin, store)

export default store
