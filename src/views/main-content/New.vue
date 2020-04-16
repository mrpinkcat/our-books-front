<template>
  <div class="new">
    <span class="page-title">Les nouveautés</span>
    <div class="cards" v-if="books.length > 0">
      <BookCard v-for="book in books" :book="book" :key="book._ids[0]"></BookCard>
    </div>
    <span v-else>Chargement...</span>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Axios from 'axios';
import BookCard from './../../components/BookCard.vue';

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
  description: string,
  libraryIds: string[],
}

@Component({
  components: {
    BookCard,
  },
})
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
      description: string;
    }

    Axios.get('http://pink.zapto.org:3001/books')
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
            description: book.description,
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
                description: book.description,
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

  .cards {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}
</style>
