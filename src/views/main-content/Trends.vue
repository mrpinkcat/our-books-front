<template>
  <div class="trends">
    <span class="title">Les tendances</span>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Trends extends Vue {

}
</script>

<style lang="scss" scoped>
@import './../../scss/index.scss';

.trends {

  .title {
    font-weight: bold;
  }
}
</style>
