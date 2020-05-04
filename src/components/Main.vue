<template>
  <el-container style="height: 100%;">
    <el-aside width="auto" height="auto">
      <el-scrollbar class="aside-scrollbar">
        <el-menu style="height:800px"
                 class="el-menu-vertical-demo"
                 @open="handleOpen"
                 @close="handleClose"
                 background-color="#2A3343"
                 text-color="rgb(209,211,215)"
                 active-text-color="#08F5DA"
                 :collapse="isCollapse">
          <AsideMenu :treeMenu="this.treeMenu"></AsideMenu>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container style="height: auto" class="main-wrap">
      <el-scrollbar class="main-scroll">
        <el-header style="height: auto;font-size: 12px">
          <el-row type="flex" justify="space-between" class="header-wrap">
            <el-col :span="4">
              <div class="grid-content bg-purple flex-start-class">
                <el-link :underline="false" class="icon-wrap" @click="controlMenu">
                  <i class="el-icon-s-unfold" v-if="isCollapse"></i>
                  <i class="el-icon-s-fold" v-else></i>
                </el-link>
                <el-link :underline="false" type="info" @click="controlMenu">
                  首页
                </el-link>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple-light flex-end-class">
                <el-button type="warning" size="mini" @click="logOut">退出</el-button>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <WorkTab :workTags="this.workTags"></WorkTab>
            </el-col>
          </el-row>
        </el-header>
        <el-main style="overflow-y: inherit;">
          <ClosingPage></ClosingPage>
        </el-main>
      </el-scrollbar>
    </el-container>

  </el-container>
</template>

<script type="module">
  import AsideMenu from './asideMenu/AsideMenu.vue'
  import WorkTab from "./workTab/WorkTab";
  import ClosingPage from "./closingPage/ClosingPage";

  export default {
    data() {
      return {
        isCollapse: false,
        treeMenu: [],
        workTags: {},
        activeTab: 'index'
      }
    },
    components: {
      AsideMenu,
      WorkTab,
      ClosingPage
    },
    mounted() {
      //初始化菜单
      this.initTreeMenu()
      //初始化标签
      this.initWorkTags()
      //监听添加标签页
      this.$bus.$on("addOrUpdateWorkTag", (menu) => {
        //添加或更新vuex worKTags
        //重新设置格式
        let tag = {
          name: menu.name,
          path: menu.path
        }
        this.$store.dispatch('addOrUpdateWorkTag', tag)
        this.$router.push(tag.path)
      });
    },
    methods: {
      initTreeMenu() {
        this.treeMenu = this.$store.getters.userMenu
      },
      initWorkTags() {
        this.workTags = this.$store.getters.workTags
      },
      logOut() {
        this.$store.commit('cleanAll')
        window.location.reload()
      },
      controlMenu() {
        this.isCollapse = !this.isCollapse
      },
      //父菜单展开事件
      handleOpen(key, keyPath) {
      },
      //父菜单关闭事件
      handleClose(key, keyPath) {
      },
    },

  };
</script>
<style>
  @import '../assets/css/main.css';
</style>
