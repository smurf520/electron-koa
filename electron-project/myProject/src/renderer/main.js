import Vue from 'vue';
import axios from 'axios';
import VueDraggableResizable from 'vue-draggable-resizable';
import 'vue-draggable-resizable/dist/VueDraggableResizable.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import MavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
import API from './config/api';

import App from './App';
import router from './router';
import store from './store';


Vue.component('vue-draggable-resizable', VueDraggableResizable);
Vue.use(ElementUI);
Vue.use(MavonEditor);
Vue.prototype.$API = API;

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

axios.interceptors.request.use(
  (config) => {
    if (localStorage.getItem('accessToken')) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = `token ${localStorage.getItem('accessToken')}`;
    }
    return config;
  },
  err => Promise.reject(err),
);


/* eslint-disable no-new */
new Vue({
  components: {
    App,
  },
  router,
  store,
  template: '<App/>',
}).$mount('#app');
