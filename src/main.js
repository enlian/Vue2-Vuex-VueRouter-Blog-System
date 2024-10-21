import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // 引入 Vuetify 样式
import '@mdi/font/css/materialdesignicons.css'; // 引入 Material Design Icons
import * as components from 'vuetify/components'; // 导入所有 Vuetify 组件
import * as directives from 'vuetify/directives'; // 导入 Vuetify 指令
import { makeServer } from './server'; // 引入 Mirage.js 配置

// 启动 Mirage.js 服务器
if (process.env.NODE_ENV === 'development') {
    makeServer();
  }
  
const vuetify = createVuetify({
  components, // 注册组件
  directives, // 注册指令
});

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app');
