<template>
  <v-row justify="end">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="accent" class="btn-add" dark v-on="on"><span class="mr-2">+ Add Article</span></v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Article</span>
        </v-card-title>
        <v-card-text>
          <v-form class="px-3" ref="form" v-model="valid">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="title" label="Title*" :rules="titleRules" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="url" label="URL*" :rules="urlRules" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select :items="categories"
                            v-model="selectedItem"
                            label="Select">
                  </v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="onSave">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>

export default {
  data() {
    return {
      valid: false,
      title: '',
      url: '',
      categories: [
        { text: 'CSS/HTML', value: '1' },
        { text: 'JavaScript and Beyond', value: '2' },
        { text: 'MISC.', value: '3' },
      ],
      selectedItem: [],
      dialog: false,
      titleRules: [
        v => !!v || 'Title is required',
      ],
      urlRules: [
        v => !!v || 'URL is required',
      ],
    };
  },
  methods: {
    onSave() {
      if (this.$refs.form.validate()) {
        this.dialog = false;
        this.$store.dispatch('addArticle', {
          title: this.title,
          url: this.url,
          category: this.selectedItem,
        });
        this.clearData();
      }
    },
    clearData() {
      this.title = '';
      this.url = '';
      this.selectedItem = [];
      this.$refs.form.reset();
    },
  },
  computed: {

  },
};
</script>
<style lang="scss" scoped>
.btn-add {
	transform: translateX(40px);
}
</style>
