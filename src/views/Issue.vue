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
        <v-text-field
          v-model="name"
          label="Name*"
          :rules="nameRules"
          required
        ></v-text-field>
        </v-form>
        </v-card-text>
      <article>
        <AddArticlePopup></AddArticlePopup>
        <h3>Articles</h3>
        <v-list-item v-for="article in articleList"
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
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length < 20
            || 'Name should be less then 20 characters',
      ],
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
    articleList() {
      return this.$store.getters.getArticles;
    },
  },
  methods: {
    onCreate() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('createIssue', {
          name: this.name,
          articles: this.$store.getters.getArticles,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
