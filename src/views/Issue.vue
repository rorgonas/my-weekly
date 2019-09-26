<template>
  <div class="issue-item">
    <nav v-if="isAuthenticated">

    </nav>
    <header v-if="isEditMode">
      <h1>Edit Issue</h1>
    </header>
    <header v-else>
      <h1>Create New Issue</h1>
      <aside>
        <v-btn @click="onCreate">
          <span class="mr-2">Create</span>
        </v-btn>
      </aside>
      <v-card-text>
        <v-form ref="form" v-model="valid">
        <v-text-field v-model="name" label="WEEKLY READING LIST #1 September 23rd, 2019"></v-text-field>
        </v-form>
        </v-card-text>
      <article>
        <AddArticlePopup></AddArticlePopup>
        <h3>Articles</h3>
        <v-list-item v-for="article in getArticleList"
                     :key="article.id">
          <v-list-item-content>
            <v-list-item-title v-text="article.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </article>
    </header>
  </div>
</template>

<script>
import AddArticlePopup from '@/components/AddArticlePopup';

export default {
  data() {
    return {
      valid: false,
      name: '',
      articles: [],
      issueNumber: 0,
    };
  },
  components: {
    AddArticlePopup,
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    isEditMode() {
      return !!(this.$route.params.id !== '0');
    },
    getArticleList() {
      return this.$store.getters.getArticles;
    },
  },
  methods: {
    setCurrentIssueNameNumber() {
      const issues = this.$store.getters.getIssues.length;
      const idx = issues + 1;
      this.issueNumber = `#${idx}`;
    },
    onCreate() {
      // @todo: get publishedDate from Calendar widget
      if (this.$refs.form.validate()) {
        this.setCurrentIssueNameNumber();
        this.$store.dispatch('createIssue', {
          number: this.issueNumber,
          title: `WEEKLY READING LIST ${this.issueNumber}`,
          publishedDate: 'September 19, 2019',
          articles: this.$store.getters.getArticles,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
