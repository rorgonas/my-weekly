<template>
  <v-app  class="grey lighten-4">
    <v-app-bar app>
      <v-toolbar-title class="headline">
        <v-btn>
			<span>MyWeekly</span>
		</v-btn>
		
        <span class="font-weight-light">App</span>
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

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
    
  },
  data: () => ({
    //
  }),
};
</script>
