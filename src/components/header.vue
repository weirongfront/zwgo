<template>
    <header class="header clearfix">
        <div class="fl">
            <img src="../assets/imgs/header/head_logo.svg"/>
        </div>
        <div class="fr">
            <el-menu class="el-menu-demo" mode="horizontal">
                <el-submenu index="1">
                    <template slot="title">用户名</template>
                    <el-menu-item index="2-1">个人中心</el-menu-item>
                    <el-menu-item index="2-2">退出登录</el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
    </header>
</template>

<script>
// @ is an alias to /src
import {mapGetters, mapActions} from 'vuex';

export default {
    name: "app-header",
    mounted() {

    },
    computed: {
        ...mapGetters('errorLog', {
            errorLogs: 'errorLogs'
        })
    },
    methods: {
        ...mapActions('errorLog', {
            addErrorLog: 'addErrorLog'
        })
    }
};
</script>
<style lang="scss" scoped>
    .header{
        height: $header-height+px;overflow: hidden;background:#fff;
        >.fl{
            padding:17px 0 17px 40px;
            img{height: 36px;}
        }
    }
</style>
