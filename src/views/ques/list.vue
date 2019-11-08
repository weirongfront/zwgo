<template>
    <div>
        <el-table :data="tableData">
            <el-table-column prop="title" label="问卷名称">
            </el-table-column>
            <el-table-column prop="user_name" width="120" label="创建人">
            </el-table-column>
            <el-table-column prop="active_time" width="120" label="有效期至" :formatter="dateAFormater">
            </el-table-column>
            <el-table-column prop="createtime" width="200" label="创建时间" :formatter="dateFormater">
            </el-table-column>
            <el-table-column prop="status" width="80" label="状态" :formatter="statusFormater">
            </el-table-column>
            <el-table-column
                prop="operation" width="300"
                label="操作">
                <template slot-scope="scope">
                    <el-button size="small" @click="showQR(scope.row.Id)">问卷地址</el-button>
                    <el-button size="small" type="primary" @click="toAnswList(scope.row.Id)">作答情况</el-button>
                    <el-button size="small" type="danger" @click="setStatus(scope.row)">{{btnStatusFormater(scope.row)}}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="查看信息" :visible.sync="dialogQRVisible">
            <zw-qrcode :content="quesLink"></zw-qrcode>
            <a :href="quesLink" target="_blank">{{quesLink}}</a>
        </el-dialog>
    </div>
</template>
<script>
// @ is an alias to /src
import {getQuesList, setStatusById} from "../../data/modules/ques";
import ZwQrcode from "../../components/zw-qrcode";
import {parseTime} from "../../utils";

export default {
    name: "ques-list",
    components: {ZwQrcode},
    data() {
        return {
            tableData: [],
            dialogQRVisible:false,
            quesLink:''
        }
    },
    mounted() {
        this.getQuesList();
    },
    methods: {
        btnStatusFormater(row){
            return row.status === 0?'禁用':'启用';
        },
        statusFormater(row){
            return row.status === 0?'启用':'禁用';
        },
        dateAFormater(row){
            return parseTime(new Date(row.active_time),'{y}-{m}-{d}');
        },
        dateFormater(row){
            return parseTime(new Date(row.createtime));
        },
        getQuesList(){
            getQuesList().then((list)=>{
                this.tableData = list;
            });
        },
        // 设置问卷状态
        setStatus(row){
            setStatusById({
                id:row.Id,
                status:row.status === 0?1:0
            }).then(()=>{
                this.getQuesList()
            });
        },
        showQR(id){
            this.quesLink = window.location.origin+'/#/questionnaire?id='+id;
            this.dialogQRVisible = true;
        },
        toAnswList(id){
            this.$router.push({path:'/ques/statistics',query:{questionnaireId:id}});
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
