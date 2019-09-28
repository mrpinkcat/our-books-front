<template>
  <div class="short">
    <span class="title">Les petits livres</span>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Short extends Vue {

}
</script>

<style lang="scss" scoped>
@import './../../scss/index.scss';

.short {

  .title {
    font-weight: bold;
  }
}
</style>
