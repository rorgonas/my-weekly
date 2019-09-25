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
      due: null,
      menu: false,
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
      if(this.$refs.form.validate()) {
        this.loading = true
        const project = { 
          title: this.title,
          content: this.content,
          due: format(this.due, 'Do MMM YYYY'),
          person: 'The Net Ninja',
          status: 'ongoing'
        }
        db.collection('projects').add(project).then(() => {
          this.loading = false
          this.dialog = false
          this.$emit('projectAdded')
        })
      }
    }
  },
  computed: {
    formattedDate () {
      console.log(this.due)
      return this.due ? format(this.due, 'Do MMM YYYY') : ''
    }
  }
}
</script>

<style lang="scss" scoped>

</style>