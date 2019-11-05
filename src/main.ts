import Vue from 'vue';
import App from './App.vue';
import router from './router';

import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';


Vue.config.productionTip = false;



new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

Vue.component('VueSlider', VueSlider);
