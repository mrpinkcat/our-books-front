<template>
  <div class="navbar">
    <div class="logo-container">
      <Logo/>
    </div>
    <div class="search-container">
      <img src="./../assets/search.png" alt="">
      <input type="text" placeholder="Recherche ...">
      <button>
        <img id="down-filter" src="./../assets/filter.png" :class="{ active: filterDropdownActive }" @click="filterDropdownActive = !filterDropdownActive">
      </button>
    </div>
    <transition name=""></transition>
    <div class="filter-dropdown" :class="{ active: filterDropdownActive }">
      fff
    </div>
    <div class="user-container">
      <span>John Doé</span>
      <button>
        <img id="down-arrow" src="./../assets/down-arrow.png" :class="{ active: userDropdownActive }" @click="userDropdownActive = !userDropdownActive">
      </button>
    </div>
    <transition name=""></transition>
    <div class="user-dropdown" :class="{ active: userDropdownActive }">
      <a href="">Mon compte</a>
      <a href="">Déconexion</a>
      <a href="">Admin</a>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Logo from './Logo.vue';

@Component({
  components: {
    Logo,
  },
})
export default class Navbar extends Vue {
  userDropdownActive: boolean = false;
  filterDropdownActive: boolean = false;
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
      margin-left: 8px;
      display: flex;
      padding: 0;

      img#down-arrow {
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
    }

  }

}
</style>
