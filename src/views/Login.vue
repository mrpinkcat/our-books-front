<template>
  <div class="login">
    <div class="login-container">
      <logo :text="false"/>
      <span class="title">Connexion</span>
      <label for="username">Nom d'utilisateur</label>
      <input type="text" name="username" v-model="username" :class="{ error: errorField === 'username' }" @keydown.enter="login()">

      <label for="password">Mot de passe</label>
      <input type="password" name="password" v-model="password" :class="{ error: errorField === 'password' }" @keydown.enter="login()">

      <button @click="login()" :disabled="username == '' || password == ''">Connexion</button>

      <router-link :to="{ name: 'register' }" class="acount">Pas de compte ?</router-link>
      <span class="error-hint" v-if="errorField === 'username'">Nom d'utilisateur incorrect</span>
      <span class="error-hint" v-if="errorField === 'password'">Mot de passe incorrect</span>
      <span class="success title" v-if="ok">Connexion réussi</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Logo from './../components/Logo.vue';
import axios from 'axios';
import { mapMutations } from 'vuex';

@Component({
  components: {
    Logo,
  },
  methods: {
    ...mapMutations(['LOGIN']),
  },
})
export default class Login extends Vue {
  private username: string = '';
  private password: string = '';
  private error: string = '';
  private errorField: string = '';
  private ok: boolean = false;

  private login() {
    this.error = '';
    this.errorField = '';
    if (this.username && this.password) {
      axios.post(`${process.env.VUE_APP_BACK_END_ADDRESS}/auth`, { username: this.username, password: this.password })
      .then((res) => {
        this.ok = true;
        //@ts-ignore Pour ignorer les problèmes de type avec le store
        this.LOGIN(res.data.userInfo);
        setTimeout(() => {
          this.$router.push({ name: 'new' });
        }, 3000);
      })
      .catch((err) => {
        console.log(err.response.status);
        console.log(err.response.data);
        this.error = err.response.data.error;
        this.errorField = err.response.data.field;
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../scss/index.scss';

.login {
  display: flex;
  justify-content: center;
  height: 100%;
  background: url('./../assets/login-background.jpg') no-repeat center center fixed;
  background-size: cover;
  
  .login-container {
    background: $background-primary;
    padding: 50px;
    position: fixed;
    top: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-shadow: 0 19px 27px -11px rgba(0, 0, 0, 0.3);
    border-radius: 6px;

    .title {
      font-size: 20px;
      font-weight: bold;
      color: $secondary;
      margin-bottom: 20px;
    }

    label {
      margin-bottom: 10px;
    }

    input {
      margin-bottom: 20px;
      border-radius: 6px;
      border-width: 1px;
      border-style: solid;
      border-color: $secondary;
      padding: 6px 16px;
    }

    button {
      background: $secondary;
      color: $background-secondary;
      padding: 6px 16px;
      border-radius: 6px;
      box-shadow: 0 10px 27px -11px rgba(0, 0, 0, 0.3);

      &:disabled {
        cursor: not-allowed;
      }
    }

    .error-hint {
      margin-top: 20px;
      color: red;
    }
  
    .error {
      border-color: red;
    }

    .acount {
      margin-top: 20px;
      font-size: 14px;
      color: $secondary;

      &:visited {
        color: $secondary;
      }
    }

    .success {
      margin-top: 18px;
    }
  }
}
</style>
