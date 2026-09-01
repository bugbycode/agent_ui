<template>
    <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="1"
        text-color="#fff"
      >
        
        <el-menu-item index="1" @click="open('/main')">
            <el-icon><Menu /></el-icon>
            <span>站点管理</span>
        </el-menu-item>
        <el-menu-item index="2" @click="open('/setting')">
            <el-icon><setting /></el-icon>
            <span>系统设置</span>
        </el-menu-item>
    </el-menu>
</template>
<script setup lang="ts">
    import { useRoute, useRouter } from 'vue-router'
    const router = useRouter()
    const open = (key) => {
      router.push(key);
    }
</script>