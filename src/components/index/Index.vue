<template>
  <div class="index-wrap">
  <img src="@/assets/img/index/index.gif">
  </div>

</template>

<script>
  export default {
    name: "Index",
  }
</script>

<style scoped>
  .index-wrap {
    width: 100%;
    height:800px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    background: #e3e3e3;
  }

  .index-wrap img {
    height: auto;
    max-width: 35%;
    margin: 120px;
  }
</style>
