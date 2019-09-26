<template>
  <div class="issue-item mt-2">
    <div v-if="isEditMode">
      <v-layout>
        <v-flex xs12 md6>
          <h1 class="subheading grey--text font-weight-light ml-5">Create New Issue</h1>
        </v-flex>
        <v-flex xs12 md6>
          <div class="flex-row">
            <v-btn large class="ml-auto d-block" color="primary" @click="onCreate" :disabled="!isSaveBtnEnables">
              <v-icon>save_alt</v-icon>
              <span class="mx-2">Save This Issue</span>
            </v-btn>
          </div>
        </v-flex>
      </v-layout>

      <v-container class="my-5">
      <v-card flat class="pl-2">
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-layout>
              <v-flex xs12>
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      :value="publishDate"
                      label="Pick a Publish Date"
                      prepend-icon="event"
                      :rules="dateRules"
                      required
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="publishDate" no-title @input="menu = false"></v-date-picker>
                </v-menu>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>

      <v-card flat>
        <AddArticlePopup />
          <v-divider class="my-5"></v-divider>
          <h2 class="grey--text font-weight-light">Articles</h2>
          <v-list-item v-for="article in getArticles" :key="article.id">

        <h2 class="grey--text font-weight-light">CSS/HTML</h2>
            <v-list-item-content>
              <v-list-item-title v-text="article.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
      </v-card>
      </v-container>
    </div>


    <div v-else>
      <v-layout>
        <v-flex xs12>
          <h1 class="subheading grey--text font-weight-light ml-5">{{ issue.title }} {{ issue.publishDate}}</h1>
        </v-flex>
      </v-layout>

      <v-container class="my-5">
          <h2 class="grey--text font-weight-light">Articles</h2>
		  <v-card flat class="pl-2">
			  <v-list>
				  <v-list-item v-for="article in issue.articles" :key="article.id">
					<v-list-item-content>
					{{ article.title }}<br>
            <a :href="article.url" target="_blank">{{ article.url }}</a>
					</v-list-item-content>
				</v-list-item>
			  </v-list>
		  </v-card>
      </v-container>
    </div>
  </div>
</template>

<script>

import AddArticlePopup from '@/components/AddArticlePopup';

const moment = require('moment');


export default {
  data() {
    return {
      valid: false,
      name: '',
      menu: false,
      articles: [],
      publishDate: null,
      dateRules: [v => !!v || 'Date is required'],
      issueNumber: 0,
      issue: [],
      cssArticles: [],
      jsArticles: [],
      miscArticles: [],
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
      return !!(this.$route.params.id === 'new');
    },
    getArticles() {
      return this.$store.getters.getArticles;
    },
    formattedDate() {
      const date = this.publishDate ? this.publishDate : new Date();
      return moment(date).format('MMMM Do YYYY');
    },
    isSaveBtnEnables() {
      return this.$store.getters.getSaveBtnStatus;
    },
  },
  mounted() {
    if (!this.isEditMode) {
      this.issue = this.getSelectedIssue();
    }
    this.articles = this.$store.getters.getArticles;
  },
  methods: {
    getSelectedIssue() {
      const id = parseInt(this.$route.params.id, 10);
      const issue = this.$store.getters.getIssues;

      return issue[id];
    },
    setCurrentIssueNameNumber() {
      const issues = this.$store.getters.getIssues.length;
      const idx = issues + 1;
      this.issueNumber = `#${idx}`;
    },
    onCreate() {
      if (this.$refs.form.validate()) {
        this.setCurrentIssueNameNumber();
        this.$store.dispatch('createIssue', {
          number: this.issueNumber,
          title: `${this.issueNumber} WEEKLY READING LIST`,
          publishDate: this.formattedDate,
          articles: this.articles,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
