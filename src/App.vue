<template>
  <v-app>
    <v-app-bar app>
      <router-link to="/">
        <v-toolbar-title class="headline" height="64">
            <span class="font-weight-light">
              My<span class="font-weight-regular text-uppercase font-normal">Weekly</span>
            </span>
        </v-toolbar-title>
      </router-link>

      <v-spacer></v-spacer>

      <div v-if="!isAuthenticated">
        <v-btn text router to="/login">
          <span class="mr-2">Login</span>
        </v-btn>
      </div>
      <div v-else>
        <v-btn router to="/login" @click="logout">
          <span class="mr-2">Logout</span>
        </v-btn>
      </div>
    </v-app-bar>

    <v-content class="ma-4">
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

</style>
