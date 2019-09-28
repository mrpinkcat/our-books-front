<template>
  <div class="navbar">
    <div class="logo-container">
      <Logo/>
    </div>
    <div class="search-container">
      <img src="./../assets/search.png" alt="">
      <input type="text" placeholder="Recherche ...">
      <button>
        <img src="./../assets/filter.png" alt="">
      </button>
    </div>
    <div class="user-container">
      <span>John Doé</span>
      <button>
        <img src="./../assets/down-arrow.png" alt="">
      </button>
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

}
</script>

<style lang="scss" scoped>
@import './../scss/index.scss';

.navbar {
  background: $background-secondary;
  display: flex;
  height: 75px;

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

      img {
        margin: 0;
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

      img {
        width: 30px;
        height: 30px;
      }
    }
  }

}
</style>
