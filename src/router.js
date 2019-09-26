import Vue from 'vue';
import Router from 'vue-router';
import ListIssues from './views/ListIssues.vue';
import Login from './views/Login.vue';
import Signup from './views/Signup.vue';
import Issue from './views/Issue.vue';
import About from './views/About.vue';

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: Login,
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
    path: '/issue/:id',
    name: 'issue',
    component: Issue,
  },
    {
      path: '/issues',
      name: 'issue',
      component: ListIssues,
	},
	{
		path: '/about',
		name: 'about',
		component: About,
	  },
  ],
});
