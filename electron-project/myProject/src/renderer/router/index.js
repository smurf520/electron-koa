import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import FirstPage from '../components/right/FirstPage.vue';
import Note from '../components/right/Note.vue';
import NoteList from '../components/right/NoteList.vue';
import store from './../../renderer/store/index';


Vue.use(Router);


const router = new Router({
  mode: 'hash',
  routes: [{
    path: '/',
    redirect: '/login',
    meta: {
      requiresAuth: true,
    },
  }, {
    path: '/login',
    name: 'login',
    component: Login,
  }, {
    path: '/home',
    name: 'home',
    component: Home,
    redirect: '/firstPage',
    children: [{
      path: '/firstPage',
      name: 'firstPage',
      component: FirstPage,
    }, {
      path: '/note/:id',
      name: 'note',
      component: Note,
    }, {
      path: '/noteList',
      name: 'noteList',
      component: NoteList,
    }],
  }, {
    path: '*',
    redirect: '/',
  }],
});
//  注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
  //  获取store里面的token
  const token1 = store.state.token;
  //  判断要去的路由有没有requiresAuth
  if (to.meta.requiresAuth) {
    if (token1) {
      next();
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath,
        }, // 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由
      });
    }
  } else {
    next(); // 如果无需token,那么随它去吧
  }
});
export default router;
