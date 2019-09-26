import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase';
import '@/firebase/';
import router from '@/router';

Vue.use(Vuex);

const db = firebase.firestore();

export default new Vuex.Store({
  state: {
    user: null,
    isAuthenticated: false,
    articles: [],
    issues: [],
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    },
    SET_IS_AUTHENTICATED(state, payload) {
      state.isAuthenticated = payload;
    },
    ADD_ARTICLE(state, payload) {
      state.articles.push(payload);
    },
    ADD_ISSUE(state, payload) {
      state.issues.push(payload);
    },
    SET_ISSUE(state, payload) {
      state.issues = payload;
    },
    CLEAR_ARTICLES(state) {
      state.articles = [];
    },
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
    addArticle({ commit }, data) {
      commit('ADD_ARTICLE', data);
    },
    createIssue({ commit }, data) {
      const issue = `issue${data.number}`;

      db.collection('issues').doc(issue).set({
        number: data.number,
        title: data.title,
        publishedDate: data.publishedDate,
        articles: data.articles,
      })
        .then(() => {
          this._vm.$toast.open({
            message: 'Document successfully written!',
            type: 'success',
          });
          commit('ADD_ISSUE', data);
          commit('CLEAR_ARTICLES');
          router.push('/issues');
        })
        .catch((error) => {
          this._vm.$toast.open({
            message: `Error writing document: ${error.message}`,
            type: 'success',
          });
        });
    },
    getIssues({ commit, state }) {
      let items = [];
      db.collection('issues').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // commit('ADD_ISSUE', doc);
          console.log(`${doc.id} => ${doc.data()}`);
          items.push(doc.data());
        });

        commit('SET_ISSUE', items);
        return items;
      });
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
    },
  },
});
