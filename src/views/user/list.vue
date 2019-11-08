<template>
    <div>
        <el-table :data="tableData">
            <el-table-column prop="name" label="用户名">
            </el-table-column>
            <el-table-column prop="nickname" label="昵称">
            </el-table-column>
            <el-table-column prop="gender" width="80" label="性别" :formatter="genderFormater">
            </el-table-column>
            <el-table-column prop="status" width="80" label="状态" :formatter="statusFormater">
            </el-table-column>
            <el-table-column
                prop="operation" width="200"
                label="操作">
                <template slot-scope="scope">
                    <el-button size="small" type="danger" @click="setStatus(scope.row)">{{btnStatusFormater(scope.row)}}</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
// @ is an alias to /src
import {getUserList,setStatusById} from "../../data/modules/user";

export default {
    name: "user-list",
    data() {
        return {
            tableData: []
        }
    },
    mounted() {
        this.getUserList();
    },
    methods: {
        btnStatusFormater(row){
            return row.status === 0?'禁用':'启用';
        },
        genderFormater(row){
            return row.gender===0?'男':'女';
        },
        statusFormater(row){
            return row.status===0?'正常':'禁用';
        },
        // 设置问卷状态
        setStatus(row){
            setStatusById({
                id:row.Id,
                status:row.status === 0?1:0
            }).then(()=>{
                this.getUserList();
            });
        },
        getUserList(){
            getUserList().then((list)=>{
                this.tableData = list;
            });
        }
    }
};
</script>
<style lang="scss" scoped>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
    }
</style>
