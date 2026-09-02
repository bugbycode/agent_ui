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
                    <el-input v-model="form.oldPassword" type="password" show-password clearable placeholder="请输入旧密码"/>
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input v-model="form.newPassword" type="password" show-password clearable placeholder="请输入新密码"/>
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input v-model="form.confirmPassword" type="password" show-password clearable placeholder="请确认新密码"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">确认</el-button>
                    <el-button @click="cancel">取消</el-button>
                    <el-button type="warning" @click="logout">
                        注销<el-icon class="el-icon--right"><Lock /></el-icon>
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </el-col>
    
</template>
<script lang="ts" setup>
    import { ElMessageBox, ElMessage } from 'element-plus'
    import { ArrowRight } from '@element-plus/icons-vue'
    import {ref, onMounted ,reactive} from 'vue'
    import axios from '../my_axios'

    const form = reactive({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    })

    const onSubmit = () => {

        const formData = new FormData();
        formData.append('oldPassword', form.oldPassword);
        formData.append('newPassword', form.newPassword);
        formData.append('confirmPassword', form.confirmPassword);
        axios.post('/api/user/updatePassword', formData).then(function(result){
            if(result.code == 1){
                ElMessage.error({message: result.message});
            } else if(result.code == 0){
                ElMessage.success({message: result.message});
                form.oldPassword = '';
                form.newPassword = '';
                form.confirmPassword = '';
            }
        })
    }

    const cancel = () => {
        form.oldPassword = '';
        form.newPassword = '';
        form.confirmPassword = '';
    }

    const logout = () => {
        ElMessageBox.confirm('确定注销登录状态吗？', '温馨提示')
        .then(() => {
            location.href='/logout'
        }).catch(() => {
        
        })
    }
</script>