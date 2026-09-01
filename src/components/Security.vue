<template>
    <el-col :span="24">
        <el-card class="box-card pageCard">
            <el-breadcrumb :separator-icon="ArrowRight">
                <el-breadcrumb-item>安全设置</el-breadcrumb-item>
            </el-breadcrumb>
        </el-card>
    </el-col>
    <el-col :span="24">
        <el-card class="box-card pageCard">
            <el-form :model="form" label-width="auto" style="max-width: 600px">
                <el-form-item label="旧密码">
                    <el-input v-model="form.oldPassword" type="password" show-password clearable />
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input v-model="form.newPassword" type="password" show-password clearable />
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input v-model="form.confirmPassword" type="password" show-password clearable />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">确认</el-button>
                    <el-button>Cancel</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </el-col>
    
</template>
<script lang="ts" setup>
    import { ArrowRight } from '@element-plus/icons-vue'
    import {ref, onMounted ,reactive} from 'vue'
    import axios from '../my_axios'

    const form = reactive({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    })

    const onSubmit = () => {
        
    }
</script>