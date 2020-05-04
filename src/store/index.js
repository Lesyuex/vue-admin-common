//共享数据块
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('Sys-Token') ? localStorage.getItem('Sys-Token') : '',
    //保存登录的信息
    user: {
      userId: localStorage.getItem('userId') ? localStorage.getItem('userId') : '',
      username: localStorage.getItem('username') ? localStorage.getItem('username') : '',
      treeMenu: localStorage.getItem('treeMenu') ? localStorage.getItem('treeMenu') : '',
    },
    //用户拥有的菜单信息
    userMenu: [],
    //信息路由
    workTags: {
      //已经打开路由
      tags: [
        {
          name: '首页',
          path: '/index',
        }
      ],
      //当前浏览的路由
      currentTag: {
        name: '首页',
        path: '/index'
      }
    },
    closingPage: ''
  },
  //修改共享数据要从这里面的方法修改
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem("Sys-Token", token)
    },
    //设置登录的用户信息
    setUser(state, user) {
      state.user.userId = user.id + ''
      localStorage.setItem("userId", user.id)
      state.user.username = user.username + ''
      localStorage.setItem("username", user.username)
      state.user.treeMenu = JSON.stringify(user.treeMenu)
      localStorage.setItem("treeMenu", JSON.stringify(user.treeMenu))
    },
    initTreeMenu(state, userMenu) {
      state.userMenu = userMenu
    },
    /*路由操作*/
    addOrUpdateWorkTag(state, tag) {
      //看当前路由是否已经被打开且没有关闭
      let index = state.workTags.tags.findIndex(s => s.name === tag.name)
      //findIndex方法返回大于-1即存在
      if (index > -1) {
        //设置currentRoute
        state.workTags.currentRoute = state.workTags.tags[index]
      } else {
        //标签不存在，现在新建
        state.workTags.tags.push(tag)
      }
      state.workTags.currentTag = tag
      state.closingPage = ''
    },
    removeWorkTab(state, p) {
      // 关闭标签
      let index = state.workTags.tags.findIndex(s => s.name === p.name)
      if (index > -1) {
        // 清理 keep alive - start
        state.closingPage = state.workTags.tags[index].name
        // 清理 keep alive - end
        state.workTags.tags.splice(index, 1)
      }
      //当全部标签都有按钮的时候可能用到此方法
      if (p.name === state.workTags.currentTag.name) {
        console.log('当前页')
        // 是当前页，返回上一页
      }
      if (state.workTags.tags[index]) {
        state.workTags.currentTag = state.workTags.tags[index]
      }
      //取最后一个
      state.workTags.currentTag = state.workTags.tags[state.workTags.tags.length - 1]
    },
    //注销销毁登录信息，恢复默认数据
    cleanAll(state) {
      state.user.userId = ''
      state.user.username = ''
      state.user.treeMenu = []
      state.user.token = ''
      state.treeMenu = []
      state.routes = []
      localStorage.clear()
    },
  },
  //获取参数一般从里面的方法获取
  getters: {
    user(state) {
      return state.user
    },
    token(state) {
      return state.token
    },
    userMenu(state) {
      return state.userMenu
    },
    workTags(state) {
      return state.workTags
    },
    tagIndex: (state) => (p) => {
      return state.workTags.tags.findIndex(s => s.name === p)
    }
  },
  //异步操作方法
  actions: {
    addOrUpdateWorkTag({commit}, p) {
      commit('addOrUpdateWorkTag', p)
    },
    removeWorkTab({commit}, p) {
      commit('removeWorkTab', p)
    },
    selectCurrentRoute({commit}, p) {
      commit('selectCurrentRoute', p)
    }
  }
})
