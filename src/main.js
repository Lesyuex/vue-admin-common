import Vue from 'vue'
import store from './store/index'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Fragment from 'vue-fragment'
import Bus from './common/js/bus/bus'
import App from "./App"
import {commonRequest, jsonRequest, postFileRequest, getRequest} from './common/js/api/axiosApi'
import {initUserRouter} from "./common/js/router/routerUtil"
import {LoadingBar} from 'iview'
import {Message} from "element-ui";

Vue.prototype.getRequest = getRequest;
Vue.prototype.commonRequest = commonRequest;
Vue.prototype.jsonRequest = jsonRequest;
Vue.prototype.postFileRequest = postFileRequest;

Vue.use(Bus);
Vue.use(Fragment.Plugin)
Vue.use(ElementUI)
Vue.config.productionTip = false


router.beforeEach((to, from, next) => {
  LoadingBar.start();
  if (to.name === 'login') {
    next();
    return;
  }
  //这里判断用户是否登录，验证本地存储是否有token
  let token = store.getters.token
  if (token === null || token === '') {
    if (to.meta.requireAuth || to.name == null) {
      next({path: '/login', query: {redirect: '/'}})
    } else {
      next();
    }
  } else {
    if (store.getters.userMenu.length <= 0) {
      initUserRouter(router, store, to.path)
      next({...to, replace: true})
    } else {
      next()
    }
  }
})
router.afterEach(() => {
  LoadingBar.finish()
})

new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
