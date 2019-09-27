<template>
  <div class="new">
    <span class="title">Les nouveautés</span>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class New extends Vue {

}
</script>

<style lang="scss" scoped>
@import './../scss/index.scss';

.new {
  padding: 16px;

  .title {
    font-weight: bold;
  }
}
</style>
