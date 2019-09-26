<template>
  <div class="list-issues">
    <nav v-if="isAuthenticated" class="flex-row">
      <v-btn text right class="ml-auto d-block" @click="onCreate">
		  <v-icon>playlist_add</v-icon>
        <span class="mr-2">Create New Issue</span>
      </v-btn>
    </nav>

    <h1>Issues</h1>
    <v-list-item v-for="(issue, index) in issues" :key="issue.id">
      <v-list-item-content>
        <v-list-item-title>
          <router-link :to="`/issue/${index}`">
            {{ issue.title }} {{ issue.publishedDate }}
          </router-link>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
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
</style>
