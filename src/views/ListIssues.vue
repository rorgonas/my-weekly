<template>
  <div class="list-issues mt-2">
	  <v-layout>
		<v-flex xs12 md6>
			<h1 class="subheading grey--text font-weight-light ml-5">Issues</h1>
		</v-flex>
		<v-flex xs12 md6 v-if="isAuthenticated">
			<div class="flex-row">
				<v-btn text right class="ml-auto d-block" @click="onCreate">
					<v-icon>playlist_add</v-icon>
					<span class="mr-2">Create New Issue</span>
				</v-btn>
			</div>
		</v-flex>
	</v-layout>

	<v-container class="my-5">
		<v-card flat class="pl-2">
			<v-list>
				<v-list-item v-for="issue in issues" :key="issue.id">
					<v-list-item-content>
						<v-list-item-title>
          <router-link :to="`/issue/${index}`">
							<span class="ml-1">{{ issue.title }}</span> <span class="publish-date">{{ issue.publishedDate }}</span>
          </router-link>
						</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-card>
	</v-container>
    
  </div>
</template>

<script>
import router from '@/router';

export default {
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    issues() {
      return this.$store.state.issues;
    },
  },
  serverPrefetch() {
    return this.getIssues();
  },
  mounted() {
    const { issues } = this.$store.state;
    if (issues.length === 0) {
      this.getIssues();
    }
  },
  methods: {
    onCreate() {
      router.push('/issue/new');
    },
    getIssues() {
      return this.$store.dispatch('getIssues');
    },
  },
};
</script>

<style lang="scss" scoped>
.publish-date {
	font-size: 13px;
	font-weight: 700;
	margin-left: 12px;
	color: #000;
}
</style>
