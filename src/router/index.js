import VueRouter from 'vue-router'
import Vue from 'vue'

import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Home from '../views/Home.vue'
//将VueRouter设置为Vue的插件
 Vue.use(VueRouter)

 const router = new VueRouter({
   // 指定hash属性与组件的对应关系
   routes: [
     { path: '/', component: Login },
     { path: '/Register', component: Register },
     { path: '/Login', component: Login },
     { path: '/Home', component: Home },
   ]
 })
 export default router