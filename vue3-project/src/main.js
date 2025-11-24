
//new vue()创建一个实例对象
import Vue from 'vue'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import MyPlugin from './libs'
Vue.use(MyPlugin);
Vue.myGlobalMethod();
//1.以app为根组件，创建一个vue实例对象
//2.将实例对象挂载到index.html页面的#app上
createApp(App).use(router).mount('#app')
