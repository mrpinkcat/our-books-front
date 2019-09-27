import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Admin from './views/Admin.vue';
import New from './views/New.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          name: 'new',
          component: New,
        },
      ],
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
    },
  ],
});
