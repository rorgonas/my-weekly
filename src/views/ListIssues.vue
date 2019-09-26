<template>
  <div class="list-issues">
    <nav v-if="isAuthenticated" class="flex-row">
      <v-btn text right class="ml-auto d-block" @click="onCreate">
		  <v-icon>playlist_add</v-icon>
        <span class="mr-2">Create New Issue</span>
      </v-btn>
    </nav>

	<v-container class="my-5">
		<v-card flat class="pl-2">
			<v-list>
				<v-list-item v-for="(issue, index) in issues" :key="index">
					<v-list-item-content>
						<v-list-item-title @click="onSelectIssue(index)">
							<span class="ml-1">{{ issue.title }}</span> <span class="publish-date">{{ issue.publishedDate }}</span>
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
    onSelectIssue(id) {
      router.push(`/issue/${id}`);
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
  .v-list-item__title {
    cursor: pointer;
  }
</style>
