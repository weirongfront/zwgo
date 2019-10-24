<template>
    <el-aside width="200px" style="background-color: #fff;">
        <el-menu :default-openeds="[openIndex]" :router="true" class="zw-menu">
            <el-submenu v-for="(menu,index) in asideList" :index="index+''" :key="index">
                <template slot="title"><i class="el-icon-message"></i>{{menu.title}}</template>
                <el-menu-item-group>
                    <el-menu-item v-for="(item,itemIndex) in menu.children" :route="{path:item.path}" :index="index+'-'+itemIndex" :key="index+'-'+itemIndex">{{item.title}}</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </el-aside>
</template>
<script>
// @ is an alias to /src
import {mapGetters} from "vuex";

export default {
    name: "zw-aside",
    data() {
        return {
            asideList:[
                {
                    title:'问卷统计',
                    children:[
                        {title:'问卷列表',path:'/ques/list'},
                        {title:'新增问卷',path:'/ques/add'}
                    ]
                },
                {
                    title:'用户管理',
                    children:[
                        {title:'用户列表',path:'/user/list'}
                    ]
                },
                {
                    title:'日志管理',
                    children:[
                        {title:'日志列表',path:'/log/list'}
                    ]
                },
                {
                    title:'个人中心',
                    children:[
                        {title:'个人信息',path:'/user/info'},
                        {title:'修改密码',path:'/user/updatepwd'}
                    ]
                }
            ]
        }
    },
    computed:{
        openIndex(){
            let active = '';
            this.asideList.map((menu,index)=>{
                menu.children.map((item)=>{
                    if(item.path === this.$route.path){
                        active = index+'';
                    }
                })
            });
            return active;
        }
    },
    mounted() {
    },
    methods: {
    }
};
</script>
<style lang="scss" scoped>
    .zw-menu{border-right: 0;}
</style>
