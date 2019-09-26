<template>
  <div class="signup mt-2">
    <h1 class="subheading grey--text font-weight-light">Sign up</h1>

    <v-container class="my-5">
      <v-card flat>
        <v-card-text>
          <v-form class="px-3" ref="form" v-model="valid">
            <v-text-field
              prepend-icon="person"
              v-model="email"
              label="Email"
              :rules="emailRules"
              required
            ></v-text-field>
            <v-text-field
              prepend-icon="lock"
              v-model="password"
              :rules="passwordRules"
              type="password"
              label="Password"
              @click:append="show = !show"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-space-between">
          <v-btn text router to="/login" class="ml-3 mt-0 text-capitalize">
            <span>You already have an account?</span>
          </v-btn>

		  <v-btn text @click="submit" class="success ma-3 text-capitalize" :loading="loading">Signup</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      email: '',
      password: '',
      show: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length >= 6
          || 'Password must be greater than 6 characters',
      ],
      loading: false,
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('userJoin', {
          email: this.email,
          password: this.password,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
