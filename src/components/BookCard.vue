<template>
  <div class="book-card">
    <img :src="book.coverUrl"/>
    <span class="quantity">Disponible : <span class="green">{{book._ids.length}}</span></span>
    <div class="book-info">
      <span class="title">{{book.name}}<span class="author"> - {{book.author}}</span></span>
      <span class="description">{{book.description}}</span>
      <router-link tag="button" :to="{ name: 'book', params: { isbn: book.isbn }}">Voir plus ou reserver</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class BookCard extends Vue {
  @Prop({ required: true }) book: any;
}
</script>

<style lang="scss" scoped>
@import './../scss/index.scss';

.book-card {
  margin-bottom: 30px;
  padding: 30px;
  display: flex;
  flex-direction: row;
  background: $background-secondary;
  position: relative;
  border-radius: 10px;
  box-shadow: 0 10px 12px -14px rgba(0, 0, 0, 0.3);
  width: calc(49% - ((32px * 2));

  img {
    margin-right: 30px;
    position: left;
    width: 100px;
    align-self: center;
    border-radius: 6px;
    box-shadow: 0 10px 27px -11px rgba(0, 0, 0, 0.3);
  }

  .quantity {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 14px;

    .green {
      color: $secondary;
    }
  }

  .book-info {
    padding-right: px;
    display: flex;
    flex-direction: column;

    .title {
      font-weight: bold;
      margin-bottom: 10px;

      .author {
        opacity: (.4);
        font-weight: normal;
      }
    }

    .description {
      font-size: 14px;
      height: 75px;
      margin-top: 6px;
      overflow: hidden;
      position: relative;

      &::before {
        position: absolute;
        content: '';
        background: linear-gradient(transparent 20px, white);
        width: 100%;
        height: 100%;
      }
    }

    button {
      margin-top: 5px;
      background: $secondary;
      color: $background-secondary;
      padding: 6px 16px;
      border-radius: 6px;
      box-shadow: 0 10px 27px -11px rgba(0, 0, 0, 0.3);

      &:disabled {
        cursor: not-allowed;
      }
    }
  }
}
</style>
