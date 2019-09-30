<template>
  <div class="list-issues">
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
			<v-list v-show="issues.length !== 0">
          <v-list-item v-for="(issue, index) in issues" :key="index">
            <v-list-item-content @click="onSelectIssue(index)">
              <v-list-item-title>
                <span class="ml-1">{{ issue.title }}</span> <span class="publish-date">{{ issue.publishDate }}</span>
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon @click="onSelectIssue(index)" title="Preview">
              <v-icon color="pink">remove_red_eye</v-icon>
            </v-list-item-icon>
            <v-list-item-icon @click="onDeleteIssue(index)" title="Delete">
              <v-icon color="pink">delete_forever</v-icon>
            </v-list-item-icon>
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
    onDeleteIssue(id) {
      return this.$store.dispatch('deleteIssues');
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
    a {
      text-decoration: none;
    }
  }
  .v-list-item__icon,
  v-list-item__title {
    cursor: pointer;
  }
</style>
