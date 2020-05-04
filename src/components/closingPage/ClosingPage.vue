<template>
  <div class="content-wrap">
    <keep-alive :exclude="closingPage">
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    computed: {
      closingPage() {
        return this.$store.state.closingPage
      }
    }
  }
</script>
<style>
  .content-wrap {
    height: 100%;
    width: 100%;
  }
</style>
