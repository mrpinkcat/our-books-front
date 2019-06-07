<template>
  <div class="login">
    <h2>Création de compte</h2>
    <div class="box">

      <span>Nom d'utilisateur</span>
      <input type="text" v-model="username" @keyup.enter="submit" :class="{ errorinput: usernameError }">
      <div class="error">
        <span class="username" v-if="usernameError">Le nom d'utilisateur doit faire entre 3 et 15 caracteres</span>
      </div>
      
      <span>Mot de passe</span>
      <div class="password-row">
        <input class="password" :type="showPasswordType" v-model="password" @keyup.enter="submit" :class="{ errorinput: passwordError }">
        <div class="toogle-show-password-box">
          <input type="checkbox" id="toogle-show-password" v-model="showPassword">
          <label for="toogle-show-password">Afficher le mot de passe</label>
        </div>
      </div>

      <div class="error">
        <span class="username" v-if="passwordError">Le mot de passe ne respecte pas les conditions</span>
      </div>

      <span>Nom et prénom</span>
      <input type="text" v-model="fullName" @keyup.enter="submit">

      <span>Date de naissance</span>
      <input type="date" v-model="birthDate" @keyup.enter="submit">

      <p>Le mot de passe doit contenir au moins:
        <ul>
          <li>Entre de 8 et 25 caracteres</li>
          <li>Une majuscule</li>
          <li>Une minuscule</li>
          <li>Un chifre</li>
        </ul>
      </p>
      <button class="connection" @click="submit">S'enregister</button>
      <router-link :to="{ name: 'login' }" tag="span" class="already-account">
        Déjà un compte ?
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import Logo from './../components/Logo.vue';

@Component({
  components: {
    Logo,
  },
})
export default class Login extends Vue {
  public username: string = '';
  public password: string = '';
  public fullName: string = '';
  public birthDate: string = '';
  public stayConnected: boolean = false;
  public usernameError: boolean = false;
  public passwordError: boolean = false;
  public showPassword: boolean = false;
  public showPasswordType: string = 'password';

  private submit() {
    console.log(this.username, this.password, this.fullName, this.birthDate);
  }

  @Watch('showPassword') 
  onShowPasswordChanged(val: boolean) {
    if (val) {
      this.showPasswordType = 'text';
    } else {
      this.showPasswordType = 'password';
    }
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
      &.already-account {
        font-size: 13px;
        cursor: pointer;
      }
    }
    .already-account {
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
    input[type=text], input[type=password], input[type=date] {
      border: 2px solid transparent;
      transition-duration: .2s;
    }
    input.errorinput {
      border: 2px solid red;
      transition-duration: .2s;
    }
    .password {
      &::before {
        content: 'eye';
        height: 20px;
        width: 20px;
        background: red;
      }
    }
    li {
      text-align: left;
    }
    .toogle-show-password-box {
      display: flex;
      align-items: center;
    }
  }
} 
</style>
