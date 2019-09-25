<template>
	<div class="login mt-5">
		<h1 class="subheading grey--text font-weight-light">Login</h1>

		<v-container class="my-5">
			<v-card>
				<v-card-title>
					<h2>Add a new article</h2>
				</v-card-title>
				<v-card-text>
					<v-form class="px-3" ref="form">
					<v-text-field v-model="title" label="Title" prepend-icon="folder" :rules="inputRules"></v-text-field>
					<v-textarea v-model="content" label="Information" prepend-icon="edit" :rules="inputRules"></v-textarea>

					<v-menu v-model="menu" :close-on-content-click="false">
						<v-text-field slot="activator" :rules="inputRules"
						:value="formattedDate" clearable label="Due date" prepend-icon="date_range">
						</v-text-field>
						<v-date-picker v-model="due" @change="menu = false"></v-date-picker>
					</v-menu>

					<v-spacer></v-spacer>

					<v-btn flat @click="submit" class="success mx-0 mt-3" :loading="loading">Add Project</v-btn>
					</v-form>
				</v-card-text>
				</v-card>
		</v-container>
	</div>
</template>

<script>
	export default {
		
	}
</script>

<style lang="scss" scoped>

</style>