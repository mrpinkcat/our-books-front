import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Admin from './views/Admin.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';

import New from './views/main-content/New.vue';
import Trends from './views/main-content/Trends.vue';
import Short from './views/main-content/Short.vue';
import Long from './views/main-content/Long.vue';
import Favorites from './views/main-content/Favorites.vue';
import Book from './views/main-content/Book.vue';
import Search from './views/main-content/Search.vue';

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
        {
          path: 'book/:isbn',
          name: 'book',
          component: Book,
        },
        {
          path: 'search/:q',
          name: 'search',
          component: Search,
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
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
