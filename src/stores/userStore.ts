import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VuexPersistence from 'vuex-persist';

Vue.use(Vuex);

interface State {
  logged: boolean;

  fullName: string | undefined;
  username: string | undefined;
  birthDate: Date | undefined;
  rank: string | undefined;
  token: string | undefined;
  libraryId: string | undefined;
}

// @ts-ignore
const plugins: Array<Plugin<State>> = [new VuexPersistence().plugin];

export default new Vuex.Store({
  plugins,

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
    CHANGE_LIBRARY(argState: State, libraryId) {
      axios.post('/user/library', { libraryId }, { headers: {Authorization: `bearer ${argState.token}` } })
      .then(() => {
        argState.libraryId = libraryId;
      })
      .catch((err) => {
        console.error(err);
      });
    },

    LOGIN(argState: State, userInfo) {
      argState.logged = true;
      argState.fullName = userInfo.fullName;
      argState.username = userInfo.username;
      argState.birthDate = (new Date(userInfo.birthDate) as any);
      argState.rank = userInfo.rank;
      argState.token = userInfo.token;
      argState.libraryId = userInfo.libraryId;
    },

    DISCONNECT(argState: State) {
      argState.logged = false;
      argState.fullName = undefined;
      argState.username = undefined;
      argState.birthDate = undefined;
      argState.rank = undefined;
      argState.token = undefined;
      argState.libraryId = undefined;
    }
  },

  getters: {
    token(argState: State): string | undefined {
      return argState.token;
    },
    fullName(argState: State): string | undefined {
      return argState.fullName;
    },
    rank(argState: State): string | undefined {
      return argState.rank;
    },
    logged(argState: State): boolean {
      return argState.logged;
    },
    libraryId(argState: State): string | undefined {
      return argState.libraryId;
    },
  },
});
