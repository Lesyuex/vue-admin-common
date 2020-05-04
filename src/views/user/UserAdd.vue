<template>
  <div>
    <el-row>
      <el-col :span="5">
        <el-input v-model="entity"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5">
        双向绑定:{{entity}}
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        entity: '2-0',
      }
    },
    methods: {
    },
    computed: {

    }
  };
</script>

<style scoped>

</style>
