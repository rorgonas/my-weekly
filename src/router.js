import Vue from 'vue';
import Router from 'vue-router';
import ListIssues from './views/ListIssues.vue';
import Login from './views/Login.vue';
import Signup from './views/Signup.vue';
import Issue from './views/Issue.vue';

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: ListIssues,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup,
  },
  {
    path: '/issue:id',
    name: 'issue',
    component: Issue,
  },
  ],
});
