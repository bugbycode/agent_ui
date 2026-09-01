<template>
  
  <el-row>
    <el-col :span="4">
      <MenuView class="menu_style"></MenuView>
    </el-col>
    <el-col :span="20">
      <router-view></router-view>
    </el-col>
  </el-row>
</template>
<script setup lang="ts">
    import MenuView from './Menu.vue'
</script>
<style scoped>
.menu_style {
    background-color: #545c64;
    height: calc(100vh - 16px);
    min-width: 150px;
}

</style>
