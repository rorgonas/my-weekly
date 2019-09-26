<template>
	<div class="list-issues">
		<h1 class="subheading grey--text font-weight-light">Issues</h1>

		<v-container class="my-5">
			<v-card flat>
				<v-card-text>

				</v-card-text>
			</v-card>
		</v-container>
	</div>
</template>

<script>
export default {
	components: {
		dta() {
			return {
				issues: [
					{
						title: "#1",
						date: "September 1st 2019",
						route: "/1/"
					},
					{},
					{},
					{},
					{}
				]
			}
		}
	}
}
</script>

<style lang="scss" scoped>

</style>