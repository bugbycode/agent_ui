<template>
    <el-col :span="24">
        <el-card class="box-card pageCard">
            <el-breadcrumb :separator-icon="ArrowRight">
                <el-breadcrumb-item>系统设置</el-breadcrumb-item>
            </el-breadcrumb>
        </el-card>
    </el-col>
    <el-col :span="24">
        <el-card class="box-card pageCard">
            <el-form :model="form" label-width="auto" style="max-width: 600px">
                <el-form-item label="本地代理">
                    <el-radio-group v-model="form.proxyStatus" size="small">
                        <el-radio-button label="开启" :value="1" />
                        <el-radio-button label="关闭" :value="0"/>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="代理端口">
                    <el-input v-model="form.agentPort" type="text" clearable placeholder="请输入0~65535的数字"/>
                </el-form-item>
                <el-form-item label="远程地址">
                    <el-input v-model="form.serverAddress" type="text" clearable placeholder="请输入IP地址或域名" />
                </el-form-item>
                <el-form-item label="远程端口">
                    <el-input v-model="form.serverPort" type="text" clearable placeholder="请输入0~65535的数字" />
                </el-form-item>
                <el-form-item label="证书密码">
                    <el-input v-model="form.keystorePassword" type="password"  show-password clearable placeholder="请输入证书密码" />
                </el-form-item>
                <el-form-item label="证书文件">
                    <el-upload
                        ref="upload"
                        class="upload-demo uploadWidth"
                        action=""
                        :limit="1"
                        :on-exceed="handleExceed"
                        :auto-upload="false"
                        drag
                        accept=".p12"
                        :on-change="handleChange"
                        v-model:file-list="fileList"
                    >
                    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                    <div class="el-upload__text">
                        拖拽文件或 <em>点击上传</em>
                    </div>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">确认</el-button>
                    <el-button @click="cancel">取消</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </el-col>
</template>
<script lang="ts" setup>
    import { ElMessageBox, ElMessage, genFileId } from 'element-plus'
    import { ArrowRight } from '@element-plus/icons-vue'
    import {ref, onMounted ,reactive} from 'vue'

    import type { UploadInstance, UploadProps, UploadRawFile, UploadFile } from 'element-plus'

    import axios from '../my_axios'
    const upload = ref<UploadInstance>()
    const fileList = ref<UploadFile[]>([])

    const form = reactive({
        id: 0,
        agentPort: '50000',
        soBacklog: '1024',
        serverPort: '36500',
        serverAddress: 'localhost',
        proxyStatus: 0,
        keystorePassword: '',
    })

    const handleChange = (file: UploadFile) => {
        console.log('文件信息：', file)
        console.log('文件名：', file.name)
        console.log('文件大小：', file.size)
        console.log('文件类型：', file.raw?.type)
        console.log('原始文件对象：', file.raw)
    }

    const handleExceed: UploadProps['onExceed'] = (files) => {
        
        upload.value!.clearFiles()
        const file = files[0] as UploadRawFile
        file.uid = genFileId()
        upload.value!.handleStart(file)
    }

    const cancel = () => {
        axios.get('/api/setting/getSetting').then(function(result){
            form.id = result.id;
            form.agentPort = result.agentPort;
            form.soBacklog = result.soBacklog;
            form.serverPort = result.serverPort;
            form.serverAddress = result.serverAddress;
            form.proxyStatus = result.proxyStatus;
            form.keystorePassword = '';
            upload.value!.clearFiles();
        }).catch(function(e){
            console.error(e);
        })
    }

    const ipRegex = /^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)$/
    const domainRegex = /^(?=.{1,253}$)(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,63}$/
    const portRegex = /^(?:[1-9]\d{0,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/

    const onSubmit = () => {
        console.log(fileList.value)
        console.log(fileList.value.length)
        var message = '';
        if(!portRegex.test(form.agentPort)) {
            message = '请输入正确的代理端口';
        } else if(!(form.serverAddress == 'localhost' || ipRegex.test(form.serverAddress) || domainRegex.test(form.serverAddress))) {
            message = '请输入正确的远程地址';
        } else if(!portRegex.test(form.serverPort)) {
            message = '请输入正确的远程端口';
        } else if(fileList.value.length > 0 && form.keystorePassword == '') {
            message = '请输入证书密码';
        }

        if(message == '') {
            const formData = new FormData();
            formData.append('agentPort', form.agentPort)
            formData.append('soBacklog', form.soBacklog)
            formData.append('serverPort', form.serverPort)
            formData.append('serverAddress', form.serverAddress)
            formData.append('proxyStatus', form.proxyStatus)
            formData.append('keystorePassword', form.keystorePassword)

            if(fileList.value.length > 0) {
                const file = fileList.value[0].raw;
                formData.append('file', file)
            }
            
            ElMessageBox.confirm('该操作将重启代理服务，请选择是否执行？', '温馨提示').then(() => {
                axios.post('/api/setting/update', formData).then(function(result){
                    if(result.code == 1){
                        ElMessage.error({message: result.message});
                    } else {
                        ElMessage.success({message: result.message});
                    }
                }).catch(function(e){
                    console.error(e);
                })
            }).catch(() => {
            
            })

            
        } else {
            ElMessage.error({message: message});
        }
    }

    onMounted(()=>{
        cancel();
    })
</script>
<style scoped>
.uploadWidth {
    width: 100%;
}
</style>