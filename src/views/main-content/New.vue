<template>
  <div class="new">
    <span class="page-title">Les nouveautés</span>
    <div class="book-card" v-for="book in books" :key="book._id">
      <span class="isbn">{{book.isbn}}</span>
      <span class="title">{{book.name}}</span>
      <span class="author">{{book.author}}</span>
      <span class="publisher">{{book.publicationDateDay}}/{{book.publicationDateMonth}}/{{book.publicationDateYear}}</span>
      <span class="quatity">Disponible : {{book._ids.length}}</span>
      <span class="biraries">Bibiliothèques : {{book.libraryIds}}</span>
      <img :src="book.coverUrl"/>
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

@Component
export default class New extends Vue {

  private books: Array<bookInterface> = [];

  private mounted() {
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

    Axios.get('http://localhost:3000/books')
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

.new {
  display: flex;
  flex-direction: column;

  .page-title {
    font-weight: bold;
    margin-bottom: 50px;
  }

  .book-card {
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    img {
      height: 50px;
      width: 50px;
    }
  }
}
</style>
