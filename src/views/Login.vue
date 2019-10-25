<template>
  <div class="login">
    <div class="login-container">
      <logo/>
      <label for="username">Nom d'utilisateur</label>
      <input type="text" name="username" v-model="username" :class="{ error: errorField === 'username'}" @keydown.enter="login()">

      <label for="password">Mot de passe</label>
      <input type="password" name="password" v-model="password" :class="{ error: errorField === 'password'}" @keydown.enter="login()">

      <button @click="login()" :disabled="username == '' || password == ''">Connexion</button>

      <span class="error-hint" v-if="errorField === 'username'">Nom d'utilisateur incorrect</span>
      <span class="error-hint" v-if="errorField === 'password'">Mot de passe incorrect</span>
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
  }
})
export default class Login extends Vue {
  private username: string = '';
  private password: string = '';
  private error: string = '';
  private errorField: string = '';

  private login() {
    this.error = '';
    this.errorField = '';
    console.log('click')
    if (this.username && this.password) {
      axios.post('http://localhost:3000/auth', { username: this.username, password: this.password })
      .then((res) => {
        //@ts-ignore Pour ignorer les problèmes de type avec le store
        this.LOGIN(res.data.userInfo);
        this.$router.push({ name: 'new' });
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

    .logo {
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
    }

    .error-hint {
      margin-top: 20px;
      color: red;
    }
  
    .error {
      border-color: red;
    }
  }
}
</style>
