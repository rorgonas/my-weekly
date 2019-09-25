<template>
	<div class="login mt-5">
		<h1 class="subheading grey--text font-weight-light">Login</h1>

		<v-container class="my-5">
			<v-card>
				<v-card-text>
					<v-form class="px-3" ref="form">
					<v-text-field v-model="name" label="Name" :rules="inputRules"></v-text-field>
					<v-text-field  v-model="password" :rules="inputRules" type="password" label="Password" @click:append="show = !show"></v-text-field>

					<v-spacer></v-spacer>

					<v-btn text @click="submit" class="success mx-0 mt-3" :loading="loading">Login</v-btn>
					</v-form>
				</v-card-text>
				</v-card>
		</v-container>
	</div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
	  password: '',
	  show: false,
      inputRules: [
        v => !!v || 'This field is required',
        v => v.length >= 3 || 'Minimum length is 3 characters'
      ],
    }
  },
  methods: {
    submit() {

    }
  },
  computed: {

  }
}
</script>

<style lang="scss" scoped>

</style>