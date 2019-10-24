<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="登录名">
                {{form.name}}
            </el-form-item>
            <el-form-item label="昵称">
                {{form.nickname}}
            </el-form-item>
            <el-form-item label="性别">
                {{genderFormater(form.gender)}}
            </el-form-item>
            <el-form-item label="生日">
                {{form.birthday}}
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
// @ is an alias to /src
import {mapGetters} from "vuex";
import {getUserInfo} from "../../data/modules/user";

export default {
    name: "user-info",
    data() {
        return {
            form:{gender:null}
        };
    },
    computed:{
        ...mapGetters('user',{info:'info'})
    },
    mounted() {
        this.getUserInfo();
    },
    methods: {
        genderFormater(gender){
            return gender!==null?gender===0?'男':'女':'';
        },
        getUserInfo(){
            getUserInfo({
                name:this.info.name
            }).then((data)=>{
                if(data.status === 0){
                    this.form = data.data;
                }else{
                    this.$alert(data.tip, {
                        confirmButtonText: '确定'
                    });
                }
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
