<template>
  <div class="book" v-if="books.length !== 0">
    <img :src="books[0].coverUrl">
    <div class="book-info">
      <span class="title">{{books[0].name}}</span>
      <span class="author">{{books[0].author}} - {{books[0].publisher}}</span>
      <span class="date">Date de parution:
        {{new Date(books[0].publicationDate).getDate()}}/{{new Date(books[0].publicationDate).getMonth() + 1}}/{{new Date(books[0].publicationDate).getUTCFullYear()}}
      </span>
      <span class="desc">{{books[0].description}}</span>
      <div class="borrow-card">
        <span class="error" v-if="errorBorrow">Ho! Il y a eu une erreur, il se pourrait que vous avez déjà emprunté un livre.</span>
        <span class="success" v-if="successBorrow && !errorBorrow">Super! Votre livre vous attends dans votre bibliothèque.</span>
        <span class="available" v-if="canBorrow && !successBorrow && !errorBorrow">Ce livre est disponible dans votre bibliothèque.</span>
        <span class="not available" v-if="!canBorrow && !successBorrow && !errorBorrow && logged">Ce livre n'est pas disponible dans votre bibliothèque.</span>
        <button v-if="logged" :disabled="!canBorrow || successBorrow || errorBorrow" @click="borrow()">Emprunter</button>
        <router-link v-if="!logged" tag="button" :to="{ name: 'login'}">Connectez vous pour emprunter ce livre</router-link>
      </div>
    </div>


  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Axios from 'axios';
import { mapGetters } from 'vuex';

@Component({
  computed: {
    ...mapGetters(['libraryId']),
    ...mapGetters(['token']),
    ...mapGetters(['logged']),
  },
})
export default class Book extends Vue {
  private books: any = [];
  private canBorrow: boolean | string = false;
  private successBorrow: boolean = false;
  private errorBorrow: boolean = false;

  private mounted() {
    // Récupération des livre depuis le back
    Axios.get('https://pink.zapto.org/books', { params: {
      isbn: this.$route.params.isbn,
    }})
    .then((res) => {
      this.books = res.data;

      this.books.forEach((book: any) => {
        // @ts-ignore store
        if (book.libraryId === this.libraryId && !book.borrowUsername) {
          this.canBorrow = book._id;
        }
      });
    })
    .catch((err) => {
      console.error(err.response);
    });
  }

  private borrow() {
    Axios.post('https://pink.zapto.org/borrow', {
      id: this.canBorrow,
        // @ts-ignore store
      libraryId: this.libraryId,
    }, {
      headers: {
        // @ts-ignore store
        Authorization: `Bearer ${this.token}`,
      },
    })
    .then((res) => {
      this.successBorrow = true;
    })
    .catch((err) => {
      console.error(err.response);
      this.errorBorrow = true;
    });
  }
}
</script>

<style lang="scss" scoped>
@import './../../scss/index.scss';

.book {

  img {
    border-radius: 8px;
    width: 300px;
    margin-right: 20px;
    box-shadow: 0 10px 27px -11px rgba(0, 0, 0, 0.3);
    align-self: center;
  }
  
  .book-info {
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    .title {
      font-weight: bold;
      font-size: 26px;
      text-transform: uppercase;
      margin-bottom: 10px;
    }

    .author {
      opacity: .75;
      margin-bottom: 10px;
    }

    .date {
      font-size: 14px;
      margin-bottom: 10px;
    }

    .desc {
      margin-top: 20px;
      margin-bottom: 30px;
      text-align: justify;
    }

    .borrow-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: auto;

      .available {
        color: $secondary;
        margin-bottom: 10px;
        font-weight: 500;

        &.not {
          color: #BF211E;
        }
      }

      .error {
        color: #BF211E;
        font-weight: 500;
        margin-bottom: 10px;
      }

      button {
        background: $secondary;
        color: $background-secondary;
        padding: 6px 16px;
        border-radius: 6px;
        box-shadow: 0 10px 27px -11px rgba(0, 0, 0, 0.3);
        transition: transform ease .2s;

        &:disabled {
          cursor: not-allowed;
          opacity: .75;
          &:hover {
            transform: none;
          }
        }

        &:hover {
          transform: scale(1.1);
        }
      }
    }
  }

}
</style>
