<template>
    <el-header class="clearfix zw-header">
        <p class="fl zw-logo">调查问卷系统</p>
        <div class="fr">
            <el-dropdown v-if="nickname" @command="handleCommand">
                <span class="el-dropdown-link">
                    {{nickname}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <span v-else class="el-dropdown-link" @click="toLogin">
                登录
            </span>
        </div>
    </el-header>
</template>
<script>
// @ is an alias to /src
import {mapGetters,mapActions} from "vuex";

export default {
    name: "zw-header",
    computed:{
        ...mapGetters('user',{nickname:'nickname'}),
        key() {
            return this.$route.path
        }
    },
    mounted() {
    },
    methods: {
        ...mapActions('user',{logout:'logout'}),
        handleCommand(command){
            if(command === 'logout'){
                this.logout().then(()=>{
                    this.$router.push('/login');
                });
            }
        },
        toLogin(){
            this.$router.push({path:'/login'});
        }
    }
};
</script>
<style lang="scss" scoped>
    .el-header {
        background-color: #B3C0D1;font-size: 14px;
        color: #333;
        line-height: 60px;
        width: 100%;
        .zw-logo{font-size: 16px;font-weight: bold;}
        .el-dropdown-link {
            cursor: pointer;
        }
        .el-icon-arrow-down {
            font-size: 12px;
        }
    }
</style>
