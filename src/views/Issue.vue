<template>
  <div class="issue-item">
    <nav v-if="isAuthenticated">

    </nav>
    <header v-if="isEditMode">
      <h1>Edit Issue</h1>
    </header>
    <header v-else>
      <h1>New Issue</h1>
    </header>
  </div>
</template>

<script>
  export default {
    components: {

    },
    computed: {
      isAuthenticated() {
        return this.$store.getters.isAuthenticated;
      },
      isEditMode(){
        const params = this.$route.params;
        console.log('route param: ', params);
        return !!(params.id !== undefined);
      }
    },
    methods: {

    }
  };
</script>

<style lang="scss" scoped>

</style>
