import Vue from 'vue';
import Vuex from 'vuex';

// import {
//   createPersistedState,
//   createSharedMutations,
// } from 'vuex-electron';

// import modules from './modules';

Vue.use(Vuex);

//  初始化时用sessionStore.getItem('token'),这样子刷新页面就无需重新登录
const state = {
  token: window.sessionStorage.getItem('token'),
  username: '',
  dataFlag: false,
  fileData: [],
  clickedId: '',
};

const mutations = {
  LOGIN: (state, data) => {
    //  更改token的值
    state.token = data;
    window.sessionStorage.setItem('token', data);
  },
  LOGOUT: (state) => {
    //  登出的时候要清除token
    state.token = null;
    window.sessionStorage.removeItem('token');
  },
  USERNAME: (state, data) => {
    //  把用户名存起来
    state.username = data;
    window.sessionStorage.setItem('username', data);
  },
  GETDATA: (state, data) => {
    state.dataFlag = data;
  },
  SETFILEDATA: (state, data) => {
    state.fileData = data;
  },
  SETCLICKEDID: (state, data) => {
    state.clickedId = data;
  },
};
const getters = {
  getDataFlag: state => state.dataFlag,
  getFileData: state => state.fileData,
  getClickedId: state => state.clickedId,
};
const actions = {
  UserLogin({
    commit,
  }, data) {
    commit('LOGIN', data);
  },
  UserLogout({
    commit,
  }) {
    commit('LOGOUT');
  },
  UserName({
    commit,
  }, data) {
    commit('USERNAME', data);
  },
  GetData({
    commit,
  }, data) {
    commit('GETDATA', data);
  },
};
export default new Vuex.Store({
  // modules,
  // plugins: [
  //   createPersistedState(),
  //   createSharedMutations(),
  // ],
  strict: process.env.NODE_ENV !== 'production',
  state,
  getters,
  mutations,
  actions,
});
