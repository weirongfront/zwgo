<template>
    <div>
        <el-table :data="tableData">
            <el-table-column prop="Id" label="ID">
            </el-table-column>
            <el-table-column prop="user" label="用户">
            </el-table-column>
            <el-table-column prop="url" label="请求路径">
            </el-table-column>
            <el-table-column prop="method" label="请求类型">
            </el-table-column>
            <el-table-column prop="ip" label="IP地址">
            </el-table-column>
            <el-table-column prop="params" label="请求参数">
            </el-table-column>
            <el-table-column prop="result" label="请求参数">
            </el-table-column>
            <el-table-column prop="begintime" label="开始时间" :formatter="beginDateFormater">
            </el-table-column>
            <el-table-column prop="endtime" label="结束时间" :formatter="endDateFormater">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
// @ is an alias to /src
import {getLogList} from "../../data/modules/log";
import {parseTime} from "../../utils";

export default {
    name: "ques-list",
    data() {
        return {
            tableData: []
        }
    },
    mounted() {
        this.getLogList();
    },
    methods: {
        beginDateFormater(row){
            return parseTime(new Date(row.begintime));
        },
        endDateFormater(row){
            return parseTime(new Date(row.endtime));
        },
        getLogList(){
            getLogList().then((list)=>{
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
