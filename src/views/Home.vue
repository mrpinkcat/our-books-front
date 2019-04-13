<template>
  <div class="home">
    <transition name="fade" mode="out-in">
      <Spinner text="Vérification de la connexion ..." color="#a3f7bf" v-if="loading"/>
      <div v-else class="not-log">
        <div class="buttons">
          <router-link :to="{ name: 'register' }" tag="div">
            <RegisterButton/>
          </router-link>
          <router-link :to="{ name: 'login'}" tag="div">
            <LoginButton/>
          </router-link>
        </div>

        <span class="admin-panel">Panel d'administration</span>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import RegisterButton from '@/components/Register.vue';
import LoginButton from '@/components/Login.vue';
import Logo from '@/components/Logo.vue';
import Spinner from '@/components/Spinner.vue';

@Component({
  components: {
    RegisterButton,
    LoginButton,
    Logo,
    Spinner,
  },
})
export default class Home extends Vue {
  private loading: boolean = true;

  private mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  }
}
</script>

<style lang="scss" scoped>
.home {
  height: calc(100% - 80px);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .not-log {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .buttons {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      div {
        margin: 10px;
      }
    }
    .admin-panel {
      position: fixed;
      bottom: 5px;
      font-size: 13px;
      color: #435055;
      cursor: pointer;
      text-decoration: underline;
      transition-duration: .2s;
      &:hover {
        color: #a3f7bf;
        transition-duration: .2s;
      }
    }
  }
}
</style>

