import Vue from 'vue';
import ECharts from 'echarts';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/ant-design-vue';
import '../antd';
import './antd-variables.less';
import './assets/css/reset.less';

Vue.prototype.$echarts = ECharts;
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
