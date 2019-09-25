<template>
	<div class="login mt-5">
		<h1 class="subheading grey--text font-weight-light">Login</h1>

		<v-container class="my-5">
			<v-card>
				<v-card-text>
					<v-form class="px-3" ref="form">
					<v-text-field v-model="title" label="Title" prepend-icon="folder" :rules="inputRules"></v-text-field>
					<v-textarea v-model="url" label="URL" prepend-icon="edit" :rules="inputRules"></v-textarea>
					<v-text-field v-model="category" label="Category" prepend-icon="edit" :rules="inputRules"></v-text-field>

					<v-spacer></v-spacer>

					<v-btn text @click="submit" class="success mx-0 mt-3" :loading="loading">Add Project</v-btn>
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
      title: '',
      url: '',
      category: null,
      inputRules: [
        v => !!v || 'This field is required',
        v => v.length >= 3 || 'Minimum length is 3 characters'
      ],
      loading: false,
      dialog: false
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