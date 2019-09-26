import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import router from '@/router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    isAuthenticated: false,
    articles: [],
    issues: []
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    },
    SET_IS_AUTHENTICATED(state, payload) {
      state.isAuthenticated = payload;
    },
    ADD_ARTICLE(state, payload){
      state.articles.push(payload);
    },
    ADD_ISSUE(state, payload) {
      state.issues.push(payload);
    },
    CLEAR_ARTICLES(state){
      state.articles = [];
    }
  },
  actions: {
    userLogin({ commit }, { email, password }) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
          commit('SET_USER', user);
          commit('SET_IS_AUTHENTICATED', true);
          router.push('/issues');
        })
        .catch((error) => {
          commit('SET_USER', null);
          commit('SET_IS_AUTHENTICATED', false);
          this._vm.$toast.open({
            message: error.message,
            type: 'error',
          });
        });
    },
    userJoin({ commit }, { email, password }) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          commit('SET_USER', user);
          commit('SET_IS_AUTHENTICATED', true);
          router.push('/issues');
        })
        .catch((error) => {
          commit('SET_USER', null);
          commit('SET_IS_AUTHENTICATED', false);
          this._vm.$toast.open({
            message: error.message,
            type: 'error',
          });
        });
    },
    userSignOut({ commit }) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          commit('SET_USER', null);
          commit('SET_IS_AUTHENTICATED', false);
          router.push('/');
        })
        .catch((error) => {
          commit('SET_USER', null);
          commit('SET_IS_AUTHENTICATED', false);
          this._vm.$toast.open({
            message: error.message,
            type: 'error',
          });
        });
    },
    addArticle({ commit }, data){
      commit('ADD_ARTICLE', data);
    },
    createIssue({ commit }, data){
      // Save to firebase()

      // db.collection('projects').add(project).then(() => {
      //   this.loading = false;
      //   this.dialog = false;
      //   this.$emit('projectAdded');
      // });

      commit('ADD_ISSUE', data);
      commit('CLEAR_ARTICLES');
      router.push('/issues');
    },
  },
  getters: {
    isAuthenticated(state) {
      return state.user !== null && state.user !== undefined;
    },
    getArticles(state) {
      return state.articles;
    },
    getIssues(state) {
      return state.issues;
    }
  },
});
