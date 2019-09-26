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
  </div>
</template>

<script>
  import router from '@/router';
export default {
  components: {

  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    onCreate() {
      // create new issue
      router.push('/issue/1');
    },
    onEdit() {
      // edit current issue
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
