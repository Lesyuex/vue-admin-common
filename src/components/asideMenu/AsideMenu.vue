<template>
  <fragment>
    <template v-for="menu in this.treeMenu">
      <el-submenu v-if="menu.children.length > 0"
                  :index="String(menu.parentId)+'-'+String(menu.id)"
                  :key="String(menu.id)">
        <template slot="title">
          <!--打印菜单图标和名字-->
          <i :class="menu.icon"></i>
          <span>{{menu.name}}</span>
        </template>
        <!--递归子菜单的子菜单-->
        <AsideMenu :treeMenu="menu.children"></AsideMenu>
      </el-submenu>
      <el-menu-item :index="String(menu.parentId)+'-'+String(menu.id)" v-else
                    v-on:click="addOrUpdateWorkTag(menu)">
        <span slot="title">
          <i class="el-icon-s-platform"></i>
          <span>{{menu.name}}</span>
        </span>
      </el-menu-item>
    </template>
  </fragment>
</template>
<script>
  export default {
    name: "AsideMenu",
    props: ['treeMenu'],
    methods: {
      addOrUpdateWorkTag(menu) {
        this.$bus.emit('addOrUpdateWorkTag',menu);
      }
    }
  };
</script>
