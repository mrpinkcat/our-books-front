import Vue from 'vue';
import store from './stores/userStore';
import router from './router';
import App from './App.vue';

import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';


Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');

Vue.component('VueSlider', VueSlider);
