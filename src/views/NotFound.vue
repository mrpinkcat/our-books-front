<template>
  <div class="not-found">
    <span class="title">404 :(</span>
    <p>Je crois que tu t'es perdu 😕</p>
    <a @click="$router.go(-1)">Retourne sur tes pas</a>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Trends extends Vue {

}
</script>

<style lang="scss" scoped>
@import './../scss/index.scss';

.not-found {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .title {
    font-weight: bold;
    font-size: 70px;
  }

  a {
    text-decoration: underline;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
