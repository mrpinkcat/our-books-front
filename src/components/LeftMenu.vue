<template>
  <div class="left-menu">
    <span class="title">Menu</span>

    <div class="buttons">
      <router-link tag="button" :to="{ name: 'new' }">
        <img src="https://via.placeholder.com/20" alt="">
        Nouveautés
      </router-link>

      <router-link tag="button" :to="{ name: 'trends' }">
        <img src="https://via.placeholder.com/20" alt="">
        Tendances
      </router-link>

      <router-link tag="button" :to="{ name: 'short-books' }">
        <img src="https://via.placeholder.com/20" alt="">
        Livres courts
      </router-link>

      <router-link tag="button" :to="{ name: 'long-books' }">
        <img src="https://via.placeholder.com/20" alt="">
        Livres longs
      </router-link>

      <router-link tag="button" :to="{ name: 'favorites' }">
        <img src="https://via.placeholder.com/20" alt="">
        Nos coup de coeur
      </router-link>
    </div>
    
    <span class="title">Catégories</span>

    <div class="types-buttons">

    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class LeftMenu extends Vue {

}
</script>

<style lang="scss" scoped>
@import './../scss/index.scss';

.left-menu {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;

  .title {
    font-weight: bold;
    padding: 16px;
  }

  .buttons {
    display: flex;
    flex-direction: column;
    padding: 8px 0;

    button {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 8px 16px;
      margin: 4px 0;
      width: 100%;

      // Transition du background
      background-color: $background-secondary;
      background-image: linear-gradient(-90deg, white, rgba(255,255,255,0));
      transition: background .2s ease-in-out;

      &:hover {
        background-color: $secondary-light;
      }

      img {
        margin-right: 12px;
      }

      &.router-link-exact-active {
        background-color: $secondary-light;
        color: $secondary;
      }
    }
  }
}
</style>
