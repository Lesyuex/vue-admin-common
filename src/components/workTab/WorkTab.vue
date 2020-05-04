<template>
  <div class="work-tab">
      <div class="tag-group">
        <el-tag v-for="tag in this.workTags.tags" class="tag-warp"
                :class="tag.name === activeTab?['active-background-color']:['white-background-color']"
                :key="tag.name"
                size="medium"
                :closable="tag.name!==index && tag.name === activeTab"
                @close="closeTag(tag)">
          <a href="javascript:void(0)" @click="change(tag)"
             :class="tag.name ===activeTab?['active-href']:['no-active-href']">
            <span v-if="tag.name === activeTab">●</span>&nbsp;{{tag.name}}
          </a>
        </el-tag>
      </div>
  </div>
</template>

<script>
  export default {
    name: "WorkTab",
    props: ['workTags'],
    data() {
      return {
        index: '首页',
        activeTab: ''
      }
    },
    created() {
      // 进来不是主页时等list加载后再更新一次current
      setTimeout(() => {

      }, 500)

    },
    watch: {
      //需要监听的数据
      '$store.state.workTags.currentTag'(tag) {
        this.activeTab = tag.name
      }
    },
    mounted() {
      //F5刷新 跳转到默认首页
      this.refreshAll()
    },
    methods: {
      refreshAll() {
        /*   this.$router.push('/index')*/
        this.activeTab = this.$store.state.workTags.currentTag.name
      },
      change(tag) {
        //更新currentRoute
        this.$bus.emit('addOrUpdateWorkTag', tag);
      },
      closeTag(tag) {
        this.$store.dispatch('removeWorkTab', tag)
        this.$router.push(this.$store.state.workTags.currentTag.path)
      }
    },
  }
</script>

<style scoped>
  @import '../../assets/css/workTab.css';

</style>
