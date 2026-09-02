<template>
    <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        text-color="#fff"
        :router="true"
        :default-active="activePath"
      >
        
        <el-menu-item index="/">
            <el-icon><Menu /></el-icon>
            <span>站点管理</span>
        </el-menu-item>
        <el-menu-item index="/security">
            <el-icon><Key /></el-icon>
            <span>安全设置</span>
        </el-menu-item>
        <el-menu-item index="/setting">
            <el-icon><setting /></el-icon>
            <span>系统设置</span>
        </el-menu-item>
    </el-menu>
</template>
<script setup lang="ts">
    import {ref, onMounted ,reactive} from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    const router = useRouter()
    const route = useRoute()

    const activePath = ref('/');

    onMounted(()=>{
        activePath.value = route.path;
    })
    
</script>