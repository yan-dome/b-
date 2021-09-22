import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import Home from '../views/layout/Home.vue';
import Login from '../views/layout/components/Login.vue';
import getMenuRouter from '../utils/permission';

Vue.use(VueRouter);
const ayncRouterMap = [{
  path: '/product',
  name: 'Product',
  meta: {
    title: '正牌商品',
    icon: 'gift',
  },
  component: Home,
  children: [
    {
      path: 'list',
      name: 'List',
      meta: {
        title: '商品列表',
        icon: 'bars',
      },
      component: () => import('@/views/page/list.vue'),
    },
    {
      path: 'add',
      name: 'Add',
      meta: {
        title: '新增商品',
        icon: 'folder-add',
      },
      component: () => import('@/views/page/add.vue'),
    },
    {
      path: 'edio/:id',
      name: 'Edio',
      meta: {
        title: '修改商品',
        icon: 'folder-add',
        hidden: true,
      },
      component: () => import('@/views/page/add.vue'),
    }, {
      path: 'category',
      name: 'Category',
      meta: {
        title: '类目管理',
        icon: 'database',
      },
      component: () => import('@/views/page/category.vue'),
    },
  ],
}];
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/Index',
    meta: {
      title: '首页',
      icon: 'home',
      hidden: false,
    },
    children: [{
      path: '/index',
      name: 'Index',
      meta: {
        title: '统计',
        hidden: false,
        icon: 'shopping',
      },
      // 懒加载
      component: () => import('@/views/page/index.vue'),
    }],
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录',
      hidden: true,
      icon: '',
    },
    children: [],
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      title: '编辑',
      hidden: true,
      icon: 'folder-add',
    },
    children: [],
    component: () => import(/* webpackChunkName: "about" */ '@/views/page/About.vue'),
  },
];
Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;
// push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};
// replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject);
  return originalReplace.call(this, location).catch((err) => err);
};
const router = new VueRouter({
  routes,
});
let isAddRoutes = false;
router.beforeEach((to, from, next) => {
  if (to.path !== '/Login') {
    if (store.state.user.appkey && store.state.user.username && store.state.user.role) {
      if (!isAddRoutes) {
        const getMenuRou = getMenuRouter(store.state.user.role, ayncRouterMap);
        store.dispatch('setMenuRoutes', routes.concat(getMenuRou)).then(() => {
          router.addRoutes(getMenuRou);
          next();
          isAddRoutes = true;
        });
      }
      return next();
    }
    return next('/Login');
  }
  return next();
});
export default router;
