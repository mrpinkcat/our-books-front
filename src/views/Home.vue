<template>
  <div class="home">
    <Navbar/>
    <div class="page">
      <LeftMenu/>
      <div class="content">
        <transition name="fade" mode="out-in">
          <router-view/>
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Navbar from './../components/Navbar.vue';
import LeftMenu from './../components/LeftMenu.vue';

@Component({
  components: {
    Navbar,
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
      height: calc(100% - 75px);

      .left-menu {
        background: $background-secondary;
        width: 250px;
      }

      .content {
        flex-grow: 1;

        & > div {
          display: flex;
          justify-content: flex-start;
          padding: 32px;
        }
      }
    }
}
</style>
