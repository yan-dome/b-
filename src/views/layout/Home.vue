<template>
  <div class="home">
    <!-- 导航列表 -->
    <LeftMenu  :key="key"/>
    <!-- 右侧内容区 -->
       <div :class="{ 'main-app': true, 'menu-unfold': $store.state.collapsed }">
    <Header  />
    <router-view></router-view>
    </div>

  </div>
</template>

<script>
import LeftMenu from './components/menu.vue';
import Header from './components/header.vue';

export default {

  data() {
    return {
      // 时间戳 用于菜单重新渲染
      key: new Date().getTime(),
    };
  },
  watch: {
    $route() {
      // 重新赋值重新渲染菜单选中项
      this.key = new Date().getTime();
    },
  },
  components: {
    Header,
    LeftMenu,
  },
  methods: {

  },
};
</script>
<style lang="less">
@import url("~@/assets/css/home.less");
</style>
