<template>
  <div class="my-header">
    <a-button
      type="primary"
      style="margin-bottom: 16px"
      @click="toggleCollapsed"
    >
      <a-icon :type="$store.state.collapsed ? 'menu-unfold' : 'menu-fold'" />
    </a-button>
    <!-- 面包屑导航 -->
    <div class="breadcrumbs">
      <a-breadcrumb v-if="currentRoutes.length > 1">
        <a-breadcrumb-item>{{
          currentRoutes[0] ? currentRoutes[0].meta.title : ""
        }}</a-breadcrumb-item>
        <a-breadcrumb-item
          ><router-link :to="{ name: currentRoutes[1].name }">{{
            currentRoutes[1] ? currentRoutes[1].meta.title : ""
          }}</router-link></a-breadcrumb-item
        >
      </a-breadcrumb>
    </div>
    <ul class="uesr-info">
      <li>欢迎{{ $store.state.user.username }}<a-icon type="down" /></li>
      <li @click="logOut">退出</li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // currentRoutes: [{
      //   name: 'Home',
      //   meta: {
      //     title: '首页',
      //   },
      // }, {
      //   name: 'Index',
      //   meta: {
      //     title: '统计',
      //   },
      // }],
      currentRoutes: this.$router.currentRoute.matched,
    };
  },
  watch: {
    $route() {
      this.currentRoutes = this.$router.currentRoute.matched;
    },
  },
  methods: {
    toggleCollapsed() {
      this.$store.dispatch('changeCollapsed');
    },
    logOut() {
      this.$store.dispatch('logOut');
      this.$router.push({
        name: 'Login',
      });
    },
  },
};
</script>
<style scoped lang="less">
.uesr-info {
  position:fixed;
  right:5px;
  top:0;
}
</style>
