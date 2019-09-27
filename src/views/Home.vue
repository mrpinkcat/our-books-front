<template>
  <div class="home">
    <Logo/>
    <div class="page">
      <LeftMenu/>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Logo from './../components/Logo.vue';
import LeftMenu from './../components/LeftMenu.vue';

@Component({
  components: {
    Logo,
    LeftMenu,
  },
})
export default class Home extends Vue {

}
</script>

<style lang="scss" scoped>
@import './../scss/index.scss';

  .home {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    height: 100%;

    .logo {
      background: $background-secondary;
      width: 100%;
      height: 70px;
    }

    .page {
      display: flex;
      flex-grow: 1;

      .left-menu {
        background: $background-secondary;
        width: 200px;
      }

      .content {
        flex-grow: 1;
      }
    }
}
</style>
