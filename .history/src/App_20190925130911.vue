<template>
  <v-app  class="grey lighten-1">
    <v-app-bar app>
      <v-toolbar-title class="headline">
        <v-btn
			text
			router
			to="/"
			class="logo">
			<h1 class="font-weight-light">My<span class="font-weight-regular text-uppercase">Weekly</span></h1>
		</v-btn>
      </v-toolbar-title>

      <v-spacer></v-spacer>

	  
      <v-btn
        text
        router
		to="/login"
      >
        <span class="mr-2">Login</span>
      </v-btn>
    </v-app-bar>

    <v-content class="mx-4 mb-4">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import AddArticlePopup from '@/components/AddArticlePopup';

export default {
  name: 'App',

	components: {
		AddArticlePopup
	},
  data() {
	  
  }),
};
</script>


<style lang="scss" scoped>

</style>
