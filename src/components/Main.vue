<template>
    <el-row>
        <el-col :span="24">
            <el-card class="box-card pageCard">
                <div slot="header" class="clearfix">
                    <el-input
                        @keydown.native.enter="query(input1,0,page.pageSize)"
                        placeholder="请输入站点域名或IP地址搜索"
                        prefix-icon="el-icon-search"
                        v-model="input1">
                    </el-input>
                    <div class="br-line"></div>
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="page.currentPage"
                        :page-sizes="[20, 50,100]"
                        :page-size="page.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="page.totalCount">
                    </el-pagination>
                    <div class="br-line"></div>
                    <el-table
                        :data="tableData"
                        border
                        stripe
                        :row-style="{height:'5px'}"
                        :cell-style="{padding: '5px 5px'}"
                        style="width: 100%">
                        <el-table-column
                        type="selection"
                        width="55">
                        </el-table-column>
                        <el-table-column
                        prop="host"
                        label="最近访问的站点">
                        </el-table-column>
                        <el-table-column 
                        width="300"
                        prop="connTime"
                        label="访问时间">
                        </el-table-column>
                        <el-table-column 
                        width="150"
                        label="访问结果">
                            <template #default="scope">
                                <el-tag type="success" v-if="scope.row.result == 1" effect="dark"> 成功 </el-tag>
                                <el-tag type="danger" v-if="scope.row.result == 0" effect="dark"> 失败 </el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column
                        width="150"
                        label="加密访问">
                            <template #default="scope">
                                <el-switch @change="changeForward(scope.row)"
                                    v-model="scope.row.forward"
                                    active-color="#13ce66"
                                    inactive-color="#d8ddda"
                                    :active-value="1"
                                    :inactive-value="0">
                                </el-switch>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="br-line"></div>
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="page.currentPage"
                        :page-sizes="[20, 50,100]"
                        :page-size="page.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="page.totalCount">
                    </el-pagination>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>
<script lang="ts" setup>
    import {ref, onMounted ,reactive} from 'vue'
    import axios from './../my_axios'

    const input1 = ref('')
    const page = reactive({
                currentPage: 1,
                pageCount: 1,
                pageSize: 20,
                startIndex: 0,
                totalCount: 1,
            })
    
    const tableData = ref([]);

    const changeForward = (row) => {
        axios.post('/api/updateForwardById?id=' + row.id 
            		  + '&forward=' + row.forward).then(function(result){
                  console.log(result);
              }).catch(function(e){
                  console.log(e);
              })
    }

    const query = (keyword,offset,limit) => {
        axios.get('/api/query',{
                  params:{
                      queryParam:keyword,
                      offset:offset,
                      limit:limit,
                  }
              }).then(function(result){
                  tableData.value = result.list;
                  let p = result.page;
                  page.currentPage = p.currentPage;
                  page.pageCount = p.pageCount;
                  page.pageSize = p.pageSize;
                  page.startIndex = p.startIndex;
                  page.totalCount = p.totalCount;
              }).catch(function(e){
                  console.log(e);
              })
    }

    //分页处理
    const handleSizeChange = (val) => {
        page.pageSize = val;
        page.startIndex = 0;
        query(input1.value, page.startIndex, page.pageSize);
    }
    const handleCurrentChange = (val) => {
        var offset = val * page.pageSize - page.pageSize;
        page.startIndex = offset;
        query(input1.value, page.startIndex, page.pageSize);
    }

    onMounted(()=>{
        query(input1.value, page.startIndex, page.pageSize);
    })

</script>
<style>

			.el-menu{
			    height: 45px;
			    padding-top: 10px;
			}
			.hand{
			    cursor:pointer
			}
			.title{
			    color: white;
			    font-size: 2em;
			    margin-left: 10px;
			    font-family: 华文行楷;
			    font-weight: bolder;
			    outline: none;
			}
			.br-line{
			    display: block;
			    height: 15px;
			}
			
			.pageCard{
				margin: 0px 0px 0px 10px;
			}
			
			.el-table--enable-row-hover .el-table__body tr:hover>td{
				background-color: #a1a1a9 !important;
				color:#ffffff !important; 
			}
</style>