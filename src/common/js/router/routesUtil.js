import {commonRequest} from "../api/axiosApi";
import {Message, Notification} from 'element-ui'

//将菜单JSON转换为Router
export function initRouter(router, store) {
  if (store.getters.routes.length > 0) {
    return
  }
  //后台获取菜单信息
  commonRequest('/userRoleMenu/listUserMenu', {userId: store.getters.user.userId}).then(async res => {
    if (store.getters.routes.length > 0) {
      return;
    }
    let routes = menuJsonToRoutes(res.data);
    router.addRoutes(routes)
    //初始化路由
    store.commit('initRoute', routes)
    Notification.success("初始化菜单数量：" + store.getters.routes.length)
  }).catch(error => {
    console.log(error)
  })
}

//后台菜单转换为路由
export const menuJsonToRoutes = (menuJson) => {
  //存储路由
  let initRoutes = []
  menuJson.forEach(menu => {
    let {
      path,
      name,
      icon,
      component,
      children
    } = menu
    if (children && children instanceof Array) {
      children = menuJsonToRoutes(children)
    }
    let route = {
      path: path,
      name: name,
      icon: icon,
      component: () => import ('../components/' + component + '.vue'),
      children: children
    }
    initRoutes.push(route)
  })
  return initRoutes
}

// 路由懒加载
function loadComponent(componentName) {
  return () => import(`@/view/${componentName}`);
}


