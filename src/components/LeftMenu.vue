<template>
  <div class="left-menu">
    <span class="title">Menu</span>

    <div class="buttons">
      <router-link tag="button" :to="{ name: 'new' }">
        <img src="./../assets/new.svg" alt="">
        Nouveautés
      </router-link>

      <!-- <router-link tag="button" :to="{ name: 'trends' }">
        <img src="./../assets/trending.svg" alt="">
        Tendances
      </router-link>

      <router-link tag="button" :to="{ name: 'short-books' }">
        <img src="./../assets/short-books.svg" alt="">
        Livres courts
      </router-link>

      <router-link tag="button" :to="{ name: 'long-books' }">
        <img src="./../assets/long-books.svg" alt="">
        Livres longs
      </router-link>

      <router-link tag="button" :to="{ name: 'favorites' }">
        <img src="./../assets/favorites.svg" alt="">
        Nos coup de coeur
      </router-link> -->
    </div>
    
    <!-- <div class="title-container">
      <span class="title">Catégories</span>
      <span class="type-quantity">(2)</span>
    </div>

    <div class="types-buttons">
      <button class="type">
        <span class="type-name">Romans Policier</span>
        <span class="book-quantity">99</span>
      </button>
      <button class="type">
        <span class="type-name">Nouvelles</span>
        <span class="book-quantity">99</span>
      </button>
    </div> -->

    <div class="lib-title-container" v-if="logged">
      <span class="title">Ma Bibliothèque</span>
      <button class="change">Modifier</button>
    </div>

    <div class="chosen-library" v-if="logged">
      <span class="lib-name" v-if="!libraryName">Chargement...</span>
      <span class="lib-name" v-if="libraryName">{{libraryName}}</span>
      <span class="lib-address" v-if="libraryName">{{libraryStreet}}<br>{{libraryZipCode}}, {{libraryCity}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import Axios from 'axios';

@Component({
  computed: {
    ...mapGetters(['libraryId']),
    ...mapGetters(['logged']),
  },
})
export default class LeftMenu extends Vue {
  private libraryName = '';
  private libraryStreet = '';
  private libraryZipCode = '';
  private libraryCity = '';

  private mounted() {
    this.showLibraryName();
  }

  private showLibraryName() {
    // @ts-ignore
    const libraryId: string = this.libraryId;

    Axios.get('https://pink.zapto.org/libraries')
    .then((res) => {
      const libraries: Array<{
        _id: string,
        name: string,
        street: string,
        city: string,
        zipCode: number,
        country: string,
        __v: number,
      }> = res.data;

      const sameLibraryId = (argLibraries: any) => {
        // @ts-ignore
        return argLibraries._id === this.libraryId;
      };

      const actualLibrary = libraries.find(sameLibraryId);

      if (actualLibrary) {
        this.libraryName = actualLibrary.name;
        this.libraryStreet = actualLibrary.street;
        this.libraryZipCode = actualLibrary.zipCode.toString();
        this.libraryCity = actualLibrary.city;
      }
    })
    .catch((err) => {
      console.error(err);
    });
  }
}
</script>

<style lang="scss" scoped>
@import './../scss/index.scss';

.left-menu {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  max-height: 100%;

  .title {
    font-weight: bold;
    padding: 16px;
  }

  .buttons {
    display: flex;
    flex-direction: column;

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
        width: 20px;
        height: 20px;
      }

      &.router-link-exact-active {
        background-color: $secondary-light;
        color: $secondary;
      }
    }
  }

  .title-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .title {
      padding-right: 8px;
    }

    .type-quantity {
      font-size: 12px;
    }
  }

  .types-buttons {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    padding: 0 24px;
    margin-bottom: 32px;

    button.type {
      padding: 7px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;

      &:hover {
        span.type-name {
          text-decoration: underline;
        }
      }

      span.book-quantity {
        font-size: 12px;
        font-weight: 400;
      }
    }
  }

  .lib-title-container {
    display: flex;

    .title {
      flex-grow: 1;
    }

    .change {
      font-size: 14px;
      padding-right: 16px;
      text-decoration: underline;
      cursor: pointer;
    }
  }

  .chosen-library {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 24px 12px 24px;

    span {
      text-align: left;
      width: fit-content;

      &.lib-name {
        font-size: 16px;
      }

      &.lib-address {
        font-size: 12px;
        margin-top: 6px;
      }
    }
  }
}
</style>
