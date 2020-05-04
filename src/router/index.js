import Vue from 'vue'
import Router from 'vue-router'
import Main from "../components/Main";
import Index from "../components/index/Index";
import Login from "../components/login/Login";
import NotFound from "../components/notfound/NotFound";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    //主界面
    {
      path: '/',
      name: 'Main',
      redirect: '/index',
      component: Main,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      children: [
        {
          path: '/index',
          name: '后台首页',
          component: Index,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        //退出
        {
          path: '/goLogin',
          name: '退出',
          component: Main,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          path: '/notFound',
          name: 'notFound',
          component: NotFound
        },
      ]
    },

  ]
})

