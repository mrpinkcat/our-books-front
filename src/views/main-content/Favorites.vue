<template>
  <div class="favorites">
    <span class="title">Nos coup de coeur</span>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Favorites extends Vue {

}
</script>

<style lang="scss" scoped>
@import './../../scss/index.scss';

.favorites {

  .title {
    font-weight: bold;
  }
}
</style>
