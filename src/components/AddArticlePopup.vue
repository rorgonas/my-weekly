<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Add Article</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
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
                  {{ selectedItems }}
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
        { text: 'CSS', value: 'CSS/HTML' },
        { text: 'JS', value: 'JS' },
        { text: 'MISC', value: 'MISC' }
      ],
      selectedItem: [],
      dialog: false,
      titleRules: [
        v => !!v || 'Title is required',
      ],
      urlRules: [
        v => !!v || 'URL is required',
      ]
    };
  },
  methods: {
    onSave() {
      if (this.$refs.form.validate()) {
        this.dialog = false;
        this.$store.dispatch('addArticle', {
          title: this.title,
          url: this.url,
          types: this.selectedItem,
        })
      }
    },
  },
  computed: {

  },
};
</script>
