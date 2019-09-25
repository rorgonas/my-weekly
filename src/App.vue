<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline" height="64">
          <span class="font-weight-light">
            My<span class="font-weight-regular text-uppercase font-normal">Weekly</span>
          </span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn text router to="/login">
        <span class="mr-2">Login</span>
      </v-btn>
    </v-app-bar>

    <v-content class="ma-4">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import AddArticlePopup from "@/components/AddArticlePopup";

export default {
  name: "App",
  components: {
    AddArticlePopup
  },
  data() {
	  return {

	  }
  },
};
</script>


<style lang="scss" scoped>
</style>
