<template>
  <div class="login mt-5">
    <h1 class="subheading grey--text font-weight-light">
		<v-icon>account-circle</v-icon>
		Login
		</h1>

    <v-container class="my-5">
      <v-card flat>
        <v-card-text>
          <v-form class="px-3" ref="form">
            <v-text-field v-model="name" label="Name" :rules="inputRules"></v-text-field>
            <v-text-field
              v-model="password"
              :rules="inputRules"
              type="password"
              label="Password"
              @click:append="show = !show"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-space-between">
           <v-btn text router to="/signup" class="ml-3 mt-0 text-capitalize">
            <span>You need an account?</span>
          </v-btn>
		  <v-btn text @click="submit" class="success ma-3 text-capitalize" :loading="loading">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      password: "",
      show: false,
      inputRules: [
        v => !!v || "This field is required",
        v => v.length >= 3 || "Minimum length is 3 characters"
      ],
      loading: false,
    };
  },
  methods: {
    submit() {}
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
</style>