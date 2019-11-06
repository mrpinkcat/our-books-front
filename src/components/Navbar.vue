<template>
  <div class="navbar">
    <div class="logo-container">
      <router-link :to="{ name: 'new' }">
        <Logo/>
      </router-link>
    </div>
    <div class="search-container">
      <img src="./../assets/search.png" alt="">
      <input @keyup.enter="search()" v-model="searchText" type="text" placeholder="Recherche ...">
      <button style="display: none;">
        <img id="down-filter" src="./../assets/filter.png" :class="{ active: filterDropdownActive }" @click="filterDropdownActive = !filterDropdownActive">
      </button>
    </div>
    <transition name=""></transition>
    <div class="filter-dropdown" :class="{ active: filterDropdownActive }">
      <input type="text" placeholder="Auteur">
      <v-calendar :start="start" :end="end" :span="span"/>
      <vue-slider v-model="pageSlider"></vue-slider>
      <input type="text" placeholder="Localisation de votre bibliothèque">
    </div>
    <div class="user-container" v-if="logged">
      <button @click="userDropdownActive = !userDropdownActive">
        <span>{{fullName}}</span>
        <img id="down-arrow" src="./../assets/down-arrow.png" :class="{ active: userDropdownActive }">
      </button>
    </div>
    <div class="user-container" v-if="!logged">
      <button @click="$router.push({ name: 'login' })">
        <span>Connexion</span>
        <img id="down-arrow" src="./../assets/login.png" >
      </button>
    </div>
    <transition name="">
      <div class="user-dropdown" :class="{ active: userDropdownActive }" v-if="logged">
        <a href="" v-if="false">Mon compte</a>
        <a @click="DISCONNECT()">Déconexion</a>
        <router-link :to="{ name: 'admin' }" v-if="rank === 'admin'">Admin</router-link>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Logo from './Logo.vue';
import { mapGetters, mapMutations } from 'vuex';

@Component({
  components: {
    Logo,
  },
  computed: {
    ...mapGetters(['fullName']),
    ...mapGetters(['rank']),
    ...mapGetters(['logged']),
    ...mapMutations(['DISCONNECT']),
  },
})
export default class Navbar extends Vue {
  private searchText: string = '';
  private userDropdownActive: boolean = false;
  private filterDropdownActive: boolean = false;

  private search() {
    this.$router.push({ name: 'search', params: { q: this.searchText }});
    this.searchText = '';
  }
}
</script>

<style lang="scss" scoped>
@import './../scss/index.scss';

.navbar {
  background: $background-secondary;
  display: flex;
  height: 75px;
  position: relative;
  z-index: 10;

  .logo-container {
    width: 250px;
    display: flex;
    align-items: center;
    justify-content: center;

    a {
      text-decoration: none;
    }
  }

  .search-container {
    margin-left: 32px;
    display: flex;
    align-items: center;
    flex-grow: 1;

    img {
      margin-right: 16px;
      width: 30px;
      height: 30px;
    }

    input {
      padding: 8px 4px;
      border: 0;
      flex-grow: 1;
      margin-right: 32px;
    }

    button {
      padding: 0px;
      margin: 0px;
      margin-right: 32px;
      display: flex;

      img#down-filter {
        width: 30px;
        height: 30px;
        transition: ease .2s all;

        &.active {
          transform: rotate(180deg);
        }
      }

    }

  }

  .user-container {
    padding-right: 32px;
    display: flex;
    align-items: center;

    button {
      display: flex;
      padding: 0;
      align-items: center;
      height: 100%;

      span {
        font-size: 18px;
      }

      img#down-arrow {
        margin-left: 8px;
        width: 20px;
        height: 20px;
        transition: ease .2s all;

        &.active {
          transform: rotate(180deg);
        }
      }
    }
  }

  .user-dropdown {
    display: none;
    position: absolute;
    right: 0;
    top: 75px;
    padding: 32px;
    flex-direction: column;
    background: $background-secondary;
    z-index: 9;

    &.active {
      display: flex;
      animation: user-dropdown-in .2s ease;
    }

    a {
      text-decoration: none;
      color: $primary;
      margin: 5px 0;
      cursor: pointer;
    }

  }


  .filter-dropdown {
    display: none;
    position: absolute;
    left: 250px;
    top: 75px;
    width: 400px;
    padding: 32px;
    flex-direction: column;
    background: $background-secondary;
    z-index: 9;

    &.active {
      display: flex;
      animation: filter-dropdown-in .2s ease;
    }

    a {
      text-decoration: none;
      color: $primary;
      margin: 5px 0;
      padding: 0;
    }

  }

}
</style>
