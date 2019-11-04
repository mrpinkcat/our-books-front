<template>
  <div class="register">
    <div class="register-container" id="one">
      <span class="step">1/2</span>
      <logo :text="false" />
      <span class="title">Création du compte</span>
      <label for="username">Nom d'utilisateur</label>
      <input type="text" name="username" v-model="username" :class="{ error: errorField === 'username' }" @keydown.enter="next()">

      <label for="password">Mot de passe</label>
      <input type="password" name="password" v-model="password" :class="{ error: errorField === 'password' }" @keydown.enter="next()">

      <label for="password">Confirmation du mot de passe</label>
      <input type="password" name="password" v-model="verifyPassword" :class="{ error: errorField === 'password' }" @keydown.enter="next()">

      <label for="password">Prénom et Nom</label>
      <input type="text" name="name" v-model="name" :class="{ error: errorField === 'name' }" @keydown.enter="next()">

      <label for="password">Date de naissance</label>
      <input type="date" name="birthDate" v-model="birthDate" :class="{ error: errorField === 'birthDate' }" @keydown.enter="next()">

      <button @click="next()" :disabled="username === '' || password === '' || verifyPassword === '' || name === '' || birthDate === ''">Suivant ></button>

      <router-link class="acount" :to="{ name: 'login' }">Tu as déjà un compte ?</router-link>
      <span class="error-hint" v-if="errorField === 'username'">Nom d'utilisateur incorrect</span>
      <span class="error-hint" v-if="errorField === 'password'">Mot de passe incorrect</span>
    </div>

    <div class="register-container" id="two">
      <span class="step">2/2</span>

      <logo :text="false" />
      <span class="title">Création du compte</span>

      <div class="wait" v-if="position.length === 0">
        <span class="title" style="color: red;">{{poserr}}</span>
        <span class="title">En attente de votre position GPS ...</span>
        <span class="hint">
          Il se pourrais que votre navigateur vous demande votre aprobation pour votre position GPS.<br>
          Sachez que votre position n'est pas stoquée par nos serveurs.
        </span>
      </div>

      <div class="position-ok" v-if="position.length !== 0">
        <p>Nous vous avons trouvé ces 3 bibliothèques, la quelle préférez vous ?</p>
        <div id="map"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import Logo from './../components/Logo.vue';
import axios from 'axios';
import { mapMutations } from 'vuex';
// Carte
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import {fromLonLat} from 'ol/proj';

@Component({
  components: {
    Logo,
  },
  methods: {
    ...mapMutations(['LOGIN']),
  },
})
export default class Register extends Vue {
  private username: string = '';
  private password: string = '';
  private verifyPassword: string = '';
  private name: string = '';
  private birthDate: string = '';
  private error: string = '';
  private errorField: string = '';
  private position: number[] = [];
  private poserr: string = '';
  
  private mounted() {
    
  }

  private mapInit() {
    console.log('init')

    const posOk = (pos: Position) => {
      console.log('pos ok');
      console.log(pos);
      this.position = [pos.coords.longitude, pos.coords.latitude];
      this.$nextTick(() => {
        this.mapCreation();
      });
    }

    const errPos = (errPos: PositionError) => {
      console.log('pos err');
      console.log(errPos);

      this.poserr = errPos.message;
    }

    navigator.geolocation.getCurrentPosition(posOk, errPos, { timeout: 10000, enableHighAccuracy: true });
  }

  private mapCreation() {
    const map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          }),
        }),
      ],
      view: new View({
        center: fromLonLat(this.position),
        zoom: 11,
      }),
    });

    // setInterval(() => {
    //   map.getView().setCenter(fromLonLat([-77.036667, 38.895]));
    //   map.getView().setZoom(5);
    // }, 2000);
  }

  private next() {
    const one = document.getElementById('one');
    const two = document.getElementById('two');
    // if (this.username !== '' || this.password !== '' || this.verifyPassword !== '' || this.name !== '' || this.birthDate !== '') {
      if (one && two) {
        one.classList.add('disapear');
        two.classList.add('visible');
        // pop out de la div 1
        setTimeout(() => {
          one.style.display = 'none';
          // Création de la map
          this.mapInit();
        }, 500)

      }
    // }
  }

  private register() {
    if (this.username !== '' || this.password !== '' || this.verifyPassword !== '' || this.name !== '' || this.birthDate !== '') {

    }
    this.error = '';
    this.errorField = '';
    axios.post('http://localhost:3000/register', { username: this.username, password: this.password })
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
</script>

<style lang="scss" scoped>
@import './../scss/index.scss';

.register {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: url('./../assets/login-background.jpg') no-repeat center center fixed;
  background-size: cover;
  
  .register-container {
    position: relative;
    background: $background-primary;
    padding: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    // height: fit-content;
    box-shadow: 0 19px 27px -11px rgba(0, 0, 0, 0.3);
    border-radius: 6px;
    max-width: 75%;

    .step {
      position: absolute;
      top: 10px;
      right: 10px;
      color: $secondary;
      font-size: 14px;
      opacity: .75;
    }
    
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

    #map {
      width: 600px;
      height: 400px;
    }

    .wait {
      display: flex;
      flex-direction: column;
      align-items: center;

      .title {
        color: $primary;
      }

      .hint {
        // font-size: 14px;
        // opacity: .3;
        text-align: center;
      }
    }

    &#one {
      // display: none;
      &.disapear {
        position: fixed;
        animation: fade-out 1s;
      }
    }

    &#two {
      display: none;

      &.visible {
        z-index: 1;
        display: flex;
        animation: fade-in .5s;
      }
    }
  }
}
</style>
