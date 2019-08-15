<template>
  <div class="login">
    <h2>Connexion</h2>
    <div class="box">
      <span>Nom d'utilisateur</span>
      <input type="text" v-model="username" @keyup.enter="submit" :class="{ errorinput: usernameError }">
      <div class="error">
        <span class="username" v-if="usernameError">Le nom d'utilisateur n'est pas reconnu</span>
      </div>
      <span>Mot de passe</span>
      <input type="password" v-model="password" @keyup.enter="submit" :class="{ errorinput: passwordError }">
      <div class="error">
        <span class="username" v-if="passwordError">Mauvais mot de passe</span>
      </div>
      <button class="connection" @click="submit">Se connecter</button>
      <div class="stay-connected">
        <input type="checkbox" id="stay-connected-checkbox" v-model="stayConnected">
        <label for="stay-connected-checkbox" class="stay-connected-text">Rester connecté</label>
      </div>
      <router-link :to="{ name: 'register' }" tag="span" class="no-account">
        Pas de compte ?
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import axios from 'axios';
import cookie from 'js-cookie';
import Logo from './../components/Logo.vue';

@Component({
  components: {
    Logo,
  },
})
export default class Login extends Vue {
  public username: string = '';
  public password: string = '';
  public stayConnected: boolean = false;
  public usernameError: boolean = false;
  public passwordError: boolean = false;

  private submit() {
    axios.post('http://localhost:3000/auth', {
      username: this.username,
      password: this.password,
    })
    .then((res) => {
      cookie.set('token', res.data.token);
      console.log(`ok ${res.data.token}`);
      this.$router.push({ name: 'home' });
      // Logique de redirection vers home ?
    })
    .catch((err) => {
      if (err.response.data.type === 'username') {
        this.usernameError = true;
      } else {
        this.usernameError = false;
      }
      if (err.response.data.type === 'password') {
        this.passwordError = true;
      } else {
        this.passwordError = false;
      }
    });
  }
}
</script>

<style lang="scss" scoped>
@import './../scss/index.scss';

.login {
  height: calc(100% - 80px);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  h2 {
    margin: 0 0 10px 0;
  }
  .box {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    span {
      margin: 5px 0;
      &.no-account {
        font-size: 13px;
        cursor: pointer;
      }
    }
    .stay-connected {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    .stay-connected-text {
      user-select: none;
    }
    .no-account {
      &:hover {
        text-decoration: underline;
      }
    }
    .error {
      width: 100%;
      height: 15px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      span {
        font-size: 12px;
        color: red;
        margin: 0;
      }
    }
    input[type=text], input[type=password] {
      border: 2px solid transparent;
      transition-duration: .2s;
    }
    input.errorinput {
      &:focus {
        outline-color: red !important;
      }
      border: 2px solid red;
      transition-duration: .2s;
    }
    button {
      margin-top: 5px;
    }
  }
} 
</style>
