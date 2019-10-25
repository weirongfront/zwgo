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
import * as quesRouter from "../../router/modules/ques";
import * as cusRouter from "../../router/modules/custom";
import * as logRouter from "../../router/modules/log";
import * as userRouter from "../../router/modules/user";
import {hasRoles} from "../../utils/auth";

export default {
    name: "zw-aside",
    data() {
        return {
            asideList:[]
        }
    },
    computed:{
        ...mapGetters('user',{info:'info'}),
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
        this.getAsideList();
    },
    methods: {
        getAsideList(){
            let userInfo = this.info,
                userRole = userInfo && userInfo.role?userInfo.role.split(','):[];
            const routers = [...quesRouter.default,...cusRouter.default,...logRouter.default,...userRouter.default];
            routers.map(menu => {
                if(hasRoles(menu.role,userRole)){
                    let children = [];
                    menu.children && menu.children.map(item=>{
                        if(hasRoles(item.role,userRole) && item.meta.menu !== false){
                            children.push({
                                title:item.meta.title,
                                path:item.path
                            });
                        }
                    });
                    if(children.length){
                        this.asideList.push({
                            title:menu.meta.title,
                            children
                        });
                    }
                }
            });
        }
    }
};
</script>
<style lang="scss" scoped>
    .zw-menu{border-right: 0;}
</style>
