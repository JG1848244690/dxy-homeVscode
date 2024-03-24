import Vue from 'vue'
import App from './App.vue'

//elementui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false

//axios
import axios from 'axios';
import VueAxios from 'vue-axios';
axios.defaults.baseURL="http://localhost:80"
Vue.prototype.$http=axios

//router
import router from './router'

Vue.use(ElementUI);
Vue.use(VueAxios,axios)

new Vue({
  render: h => h(App),
  router:router
}).$mount('#app')
