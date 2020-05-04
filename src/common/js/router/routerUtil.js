//将菜单JSON转换为Router
export function initUserRouter(router, store, path) {
  //后台获取用户信息
  let treeMenu = JSON.parse(store.getters.user.treeMenu)
  //根据用户菜单生成用户动态路由
  initRouter(treeMenu)
  //动态添加路由
  router.addRoutes([userRoutes])
  router.addRoutes([{path: '*', redirect: '/notFound', hidden: true}])
  //保存侧边栏菜单
  store.commit('initTreeMenu', userMenuList(treeMenu))
  //根据路由path激活标签
  let tag = generateTag(path)
  if (tag && tag.name && tag.name !== '') {
    store.commit('addOrUpdateWorkTag', tag)
  }
}

//用户routes
const userRoutes =
  {
    path: '/userRouter',
    name: 'userRoutes',
    redirect: '/index',
    component: () => import ("../../../components/Main.vue"),
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    },
    children: []
  }

//初始路由
function initRouter(treeMenu) {
  treeMenu.forEach(menu => {
    let {
      path,
      name,
      children,
      component
    } = menu
    let route = {
      path: path,
      name: name,
      component: () => import ('../../../' + component + '.vue'),
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    }
    userRoutes.children.push(route)
    //子菜单也要加载
    if (children && children instanceof Array && children.length > 0) {
      initRouter(children)
    }
  })
}

//初始化用户菜单
export const userMenuList = (userMenu) => {
  let menuList = []
  userMenu.forEach(menu => {
    let {
      id,
      parentId,
      name,
      path,
      icon,
      children
    } = menu
    if (menu.children && menu.children instanceof Array && menu.children.length > 0) {
      userMenuList(menu.children)
    }
    let item = {
      id: id,
      parentId: parentId,
      path: path,
      name: name,
      title: name,
      icon: icon,
      children: children
    }
    menuList.push(item)
  })
  return menuList
}

//根据toName生成tag
export const generateTag = (path) => {
  if (path === '/index')
    return
  let tag
  let index = userRoutes.children.findIndex(s => s.path === path)
  if (index > -1) {
    tag = {
      name: userRoutes.children[index].name,
      path: userRoutes.children[index].path
    }
  } else {
    tag = {
      name: '加载错误',
      path: '/notFound'
    }
  }
  return tag
}
