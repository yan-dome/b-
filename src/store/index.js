import Vue from 'vue';
import Vuex from 'vuex';
import { setCookie, getUserCookie, romoveUserCookie } from '@/utils/userCookie';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 用于切换菜单的闭合状态  false不闭合 true闭合
    collapsed: false,
    // 存储用户的信息 方便组件之间的调用
    user: getUserCookie(),
    // 存储菜单的路由
    menuRoutes: [],
  },
  mutations: {
    changeCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
    setUserInfo(state, userInfo) {
      state.user = userInfo;
    },
    logOut(state) {
      state.user = {
        username: '',
        appkey: '',
        role: '',
        email: '',
      };
    },
    setMenuRoutes(state, routes) {
      state.menuRoutes = routes;
    },
  },
  actions: {
    changeCollapsed({ commit }) {
      commit('changeCollapsed');
    },
    setUserInfo({ commit }, userInfo) {
      commit('setUserInfo', userInfo);
      setCookie(userInfo);
    },
    logOut({ commit }) {
      commit('logOut');
      romoveUserCookie();
    },
    setMenuRoutes({ commit }, routes) {
      commit('setMenuRoutes', routes);
    },
  },
  modules: {
  },
});
