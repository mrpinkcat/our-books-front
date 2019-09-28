import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Admin from './views/Admin.vue';

import New from './views/main-content/New.vue';
import Trends from './views/main-content/Trends.vue';
import Short from './views/main-content/Short.vue';
import Long from './views/main-content/Long.vue';
import Favorites from './views/main-content/Favorites.vue';

import NotFound from './views/NotFound.vue';

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
        {
          path: 'trends',
          name: 'trends',
          component: Trends,
        },
        {
          path: 'short-books',
          name: 'short-books',
          component: Short,
        },
        {
          path: 'long-books',
          name: 'long-books',
          component: Long,
        },
        {
          path: 'favorites',
          name: 'favorites',
          component: Favorites,
        },
      ],
    },
    {
      path: '/search/:q',
      name: 'admin',
      component: Admin,
    },
    {
      path: '/book/:isbn',
      name: 'admin',
      component: Admin,
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
    },
    {
      path: '*',
      name: '404',
      component: NotFound,
    },
  ],
});
