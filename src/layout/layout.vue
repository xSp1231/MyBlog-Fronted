<template>
  <div class="common-layout">
    <el-container class="main_container">
      <el-header class="header" style="z-index: 1" ><header-component></header-component></el-header>
      <el-main  class="main" ><router-view></router-view></el-main>
    </el-container>
  </div>
</template>

<script setup>
import HeaderComponent from '../components/HeaderComponent.vue'
</script>

<style scoped>
.common-layout {
  position: absolute;
  top:0;
  left: 0;
  width: 100%;
  height: 100%;
}
.main_container{
  height: 100%;
}
.header{
  height: 7%;
  padding: 0;
  background-color: #e9ebee;
}
.main{
  padding: 0;
  background-color: #ffffff;
}

</style>
