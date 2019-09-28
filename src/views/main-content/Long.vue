<template>
  <div class="long">
    <span class="title">Les livres longs</span>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Long extends Vue {

}
</script>

<style lang="scss" scoped>
@import './../../scss/index.scss';

.long {

  .title {
    font-weight: bold;
  }
}
</style>
