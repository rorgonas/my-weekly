<template>
  <div class="login mt-5">
    <h1 class="subheading grey--text font-weight-light">Login</h1>

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
              required
              @click:append="show = !show"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="submit" class="success ma-3 text-capitalize" :loading="loading">
            Login
          </v-btn>

          <v-btn text router to="/signup" class="ml-0 mt-0 text-capitalize">
            <span>You need an account?</span>
          </v-btn>
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
        this.$store.dispatch(('userLogin'), {
          email: this.email,
          password: this.password,
        });
      }
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
</style>
