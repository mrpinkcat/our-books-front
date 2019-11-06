<template>
  <div class="search">
    <span class="title">Votre recherche</span>

    <div class="found" v-if="books.length > 0">
      <span class="book" v-for="book in books" :key="book.isbn">{{book.name}} - {{book._ids.length}}</span>
    </div>

    <div class="not-found" v-if="books.length === 0">
      <span>Aucun resultat pour votre recherche</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Axios from 'axios';

interface bookInterface {
  _ids: string[],
  name: string,
  author: string,
  publisher: string,
  publicationDateDay: number,
  publicationDateMonth: number,
  publicationDateYear: number,
  coverUrl: string,
  isbn: string,
  pages: number,
  libraryIds: string[],
}

interface backBook {
  _id: string;
  name: string;
  author: string;
  publisher: string;
  publicationDate: string;
  coverUrl: string;
  isbn: string;
  pages: number;
  libraryId: string;
}

@Component
export default class Search extends Vue {
  private books: Array<bookInterface> = [];

  private mounted() {
    Axios.get('http://localhost:3000/books', { params: { q: this.$route.params.q }})
    .then((res) => {

      let previousBookRealIndex: number;

      res.data.forEach((book: backBook, index: number) => {
        const bookPublicationDate = new Date(book.publicationDate);

        // Si c'est le tout premier livre on l'ajoute directement
        if (index === 0) {
          this.books.push({
            _ids: [book._id],
            name: book.name,
            author: book.author,
            publisher: book.publisher,
            publicationDateDay: bookPublicationDate.getDate(),
            publicationDateMonth: bookPublicationDate.getMonth() + 1,
            publicationDateYear: bookPublicationDate.getUTCFullYear(),
            coverUrl: book.coverUrl,
            isbn: book.isbn,
            pages: book.pages,
            libraryIds: [book.libraryId],
          });
        } else {
          let allreadyAdd = false;
          this.books.forEach((storedBook, storedIndex) => {
            // Si on trouve un livre qui y est déjà on le push
            if (storedBook.isbn === book.isbn && !allreadyAdd) {
              storedBook._ids.push(book._id);
              storedBook.libraryIds.push(book.libraryId);
              allreadyAdd = true;
            } else if (this.books.length - 1 === storedIndex && !allreadyAdd) {
              this.books.push({
                _ids: [book._id],
                name: book.name,
                author: book.author,
                publisher: book.publisher,
                publicationDateDay: bookPublicationDate.getDate(),
                publicationDateMonth: bookPublicationDate.getMonth() + 1,
                publicationDateYear: bookPublicationDate.getUTCFullYear(),
                coverUrl: book.coverUrl,
                isbn: book.isbn,
                pages: book.pages,
                libraryIds: [book.libraryId],
              });
            } else {
            }
          });
        }
      });
    });
  }
}
</script>

<style lang="scss" scoped>
@import './../../scss/index.scss';

.search {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .title {
    font-weight: bold;
  }
}
</style>
