<template>
  <v-app>
    <v-app-bar app class="primary" height="72" v-if="$route.meta.header !== 1">
      <router-link to="/">
        <v-toolbar-title>
            <img class="brand-logo" src="/logo.png" alt="MyWEEKLY: The Latest in cutting-edge web technologies">
        </v-toolbar-title>
      </router-link>

      <v-spacer></v-spacer>

      <div v-if="!isAuthenticated">
        <v-btn text router to="/login">
        <span class="mr-2 white--text">Login</span>
        </v-btn>
      </div>
      <div v-else>
        <v-btn router to="/login" @click="logout">
          <span class="mr-2">Logout</span>
        </v-btn>
      </div>
    </v-app-bar>

    <v-content :class="{ 'ma-4': $route.meta.header !== 1 }">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import AddArticlePopup from '@/components/AddArticlePopup';

export default {
  name: 'App',
  components: {
    AddArticlePopup,
  },
  data() {
	  return {

	  };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('userSignOut');
    },
  },
};
</script>


<style lang="scss" scoped>
.brand-logo {
	display: block;
	width: 180px;
}
</style>
