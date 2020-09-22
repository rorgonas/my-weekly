import 'material-design-icons-iconfont/dist/material-design-icons.css'; // Ensure you are using css-loader
import Vue from 'vue';
import Vuetify from 'vuetify/lib';


Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'md',
  },
  theme: {
    themes: {
      light: {
        primary: '#ff4081',
        success: '#8cc34b',
        accent: '#2196F3',
      },
    },
  },
});
