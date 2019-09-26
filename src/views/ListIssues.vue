<template>
  <div class="list-issues">
    <nav v-if="isAuthenticated">
      <v-btn @click="onCreate">
        <span class="mr-2">Create New</span>
      </v-btn>
      <v-btn @click="onEdit">
        <span class="mr-2">Edit</span>
      </v-btn>
    </nav>
    <h1>Issues</h1>
    <v-list-item v-for="issue in issueList"
                 :key="issue.id">
      <v-list-item-content>
        <v-list-item-title v-text="issue.name"></v-list-item-title>
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
    issueList(){
      return this.$store.getters.getIssues;
    }
  },
  methods: {
    onCreate() {
      // create new issue
      router.push('/issue/0');
    },
    onEdit() {
      // edit current issue
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
