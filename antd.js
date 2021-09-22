// 引入abtd的文件

import Vue from 'vue';
import { message } from 'ant-design-vue';
// 注入全局属性$message

Vue.config.productionTip = false;
Vue.prototype.$message = message;
message.config({
  duration: 2, // 持续时间
  top: '100px', // 到页面顶部距离
  maxCount: 3, // 最大显示数, 超过限制时，最早的消息会被自动关闭
});
