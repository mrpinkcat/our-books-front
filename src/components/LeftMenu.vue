<template>
  <div class="left-menu">
    <span class="title">Menu</span>

    <div class="buttons">
      <button>
        <img src="https://via.placeholder.com/20" alt="">
        Nouveautés
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class LeftMenu extends Vue {

}
</script>

<style lang="scss" scoped>
@import './../scss/index.scss';

.left-menu {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;

  .title {
    font-weight: bold;
    padding: 16px;
  }

  .buttons {
    display: flex;
    flex-direction: row;
    padding: 8px 0;

    button {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 8px 16px;
      width: 100%;

      &:hover {
        background: linear-gradient(90deg, rgba(66,185,131,0.5) 0%, rgba(255,255,255,0) 100%);
      }

      img {
        margin-right: 8px;
      }
    }
  }
}
</style>
