import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    logged: false,

    fullName: undefined,
    username: undefined,
    birthDate: undefined,
    rank: undefined,
    token: undefined,
    libraryId: undefined,
  },

  mutations: {
    CHANGE_LIBRARY: (state, libraryId) => {
      axios.post('/user/library', { libraryId }, { headers: {Authorization: `bearer ${state.token}` } })
      .then(() => {
        state.libraryId = libraryId;
      })
      .catch((err) => {
        console.error(err);
      });
    },
    LOGIN: (state, userInfo) => {
      state.logged = true;
      state.fullName = userInfo.fullName;
      state.username = userInfo.username;
      state.birthDate = (new Date(userInfo.birthDate) as any);
      state.rank = userInfo.rank;
      state.token = userInfo.token;
      state.libraryId = userInfo.libraryId;
    },
  },
  getters: {
    token: (state): string | undefined => {
      return state.token;
    },
    fullName: (state): string | undefined => {
      return state.fullName;
    },
    rank: (state): string | undefined => {
      return state.rank;
    },
  },
});
