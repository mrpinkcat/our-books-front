<template>
  <div class="admin" v-if="libraries.length > 0">
    <span class="title">Add book</span>
    <label for="isbn">ISBN</label>
    <input type="text" v-model="isbn">
    <div class="lib-add-book" v-for="library in libraries" :key="library._id">
      <input type="radio" name="lib" :value="library._id" v-model="choosenLibrary">
      <label for="lib">{{library.name}}</label>
    </div>
    <button @click="addBook()">Add book</button>
    <span class="error" v-if="addError.length > 0">{{this.addError}}</span>
    <span class="ok" v-if="addOk > 0">Livre inséré {{this.newId}}</span>

    <span class="title">Return book</span>
    <label for="isbn">Nom d'utilisateur</label>
    <input type="text" v-model="returnUsername">
    <button @click="returnBook()">Return book</button>
    <span class="error" v-if="returnError.length > 0">{{this.returnError}}</span>
    <span class="ok" v-if="returnOk > 0">Livre retourné {{this.returnId}}</span>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Logo from './../components/Logo.vue';
import { mapGetters } from 'vuex';
import Axios from 'axios';

@Component({
  components: {
    Logo,
  },
  computed: {
    ...mapGetters(['token']),
  },
})
export default class Admin extends Vue {
  private isbn: string = '';
  private choosenLibrary: string = '';
  private libraries: any[] = [];
  private addError: string = '';
  private addOk: boolean = false;
  private newId: string = '';
  private returnUsername: string = '';

  private returnOk: boolean = false;
  private returnError: string = '';
  private returnId: string = '';

  private mounted() {
    Axios.get(`${process.env.BACK_END_ADDRESS}/libraries`)
    .then((res) => {
      this.libraries = res.data;
    })
    .catch((err) => {
      console.error(err.response.data);
    })
  }

  private addBook() {
    Axios.post(`${process.env.BACK_END_ADDRESS}/books/${this.isbn}`, {
      numberOfBooks: 1,
      librariesIds: [this.choosenLibrary],
      category: 'placeholder',
    }, { headers: {
      // @ts-ignore store
      Authorization: `Bearer ${this.token}`,
    }})
    .then((res) => {
      this.newId = res.data.bookDocs[0]._id;
      this.addError = '';
      this.addOk = true;
    })
    .catch((err) => {
      console.log(err.response.data.error);
      this.addError = err.response.data.error;
      this.addOk = false;
    })
  }

  private returnBook() {
    Axios.post(`${process.env.BACK_END_ADDRESS}/return`, {
      borrowUsername: this.returnUsername,
    }, { headers: {
      // @ts-ignore store
      Authorization: `Bearer ${this.token}`,
    }})
    .then((res) => {
      this.returnId = res.data._id;
      this.returnOk = true;
      this.returnError = '';
    })
    .catch((err) => {
      console.error(err.response.data);
      this.returnOk = false;
      this.returnError = err.response.data.error;
    })
  }
}
</script>

<style lang="scss" scoped>
@import './../scss/index.scss';

.admin {
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  
  .title {
    font-weight: bold;
    margin: 10px 0;
  }

  .error {
    color: red;
  }

  button {
    border: solid black 2px;
  }
}
</style>
