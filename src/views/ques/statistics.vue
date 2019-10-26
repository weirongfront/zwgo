<template>
    <div>
        <!--<el-page-header @back="goback" content="作答统计">
        </el-page-header>-->
        <el-table :data="tableData"><!-- class="mt20"-->
            <el-table-column prop="id" label="ID">
            </el-table-column>
            <el-table-column prop="name" label="提交人">
            </el-table-column>
            <el-table-column prop="ip" label="IP">
            </el-table-column>
            <el-table-column prop="createtime" label="提交时间" :formatter="dateFormater">
            </el-table-column>
            <el-table-column
                prop="operation" width="200"
                label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="toRepart(scope.row.id)">查看报告</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
// @ is an alias to /src
import {getAnswListById} from "../../data/modules/ques";
import {parseTime} from "../../utils";

export default {
    name: "answer-list",
    data() {
        return {
            tableData: [],
            questionnaireId: this.$route.query.questionnaireId
        }
    },
    mounted() {
        this.getQuesList();
    },
    methods: {
        goback(){
            this.$router.push('/ques/list');
        },
        dateFormater(row){
            return parseTime(new Date(row.createtime));
        },
        getQuesList(){
            getAnswListById({
                questionnaireId: this.questionnaireId
            }).then((list)=>{
                this.tableData = list;
            });
        },
        toRepart(id){
            this.$router.push({path:'/report',query:{id}});
        }
    }
};
</script>
<style lang="scss" scoped>
</style>
