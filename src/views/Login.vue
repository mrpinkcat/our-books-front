<template>
  <div class="login">
    <label for="username">Nom d'utilisateur</label>
    <input type="text" name="username" v-model="username" :class="{ error: errorField === 'username'}">

    <label for="password">Mot de passe</label>
    <input type="password" name="password" v-model="password" :class="{ error: errorField === 'password'}">

    <button @click="login()" :disabled="username == '' || password == ''">Connexion</button>

    <span class="error-hint" v-if="error !== ''">{{error}}</span>
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
  align-items: center;
  flex-direction: column;
  height: 100%;

  .error {
    background: red;
  }
}
</style>
