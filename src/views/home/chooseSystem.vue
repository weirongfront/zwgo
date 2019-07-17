<template>
    <div class="home">
        <div id="nav">
            <router-link to="/">Home</router-link>|
            <router-link to="/about">About</router-link>
            <router-link to="/inlet">系统选择</router-link>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from "vuex";
/*import {login,logout} from "@/data/modules/user";*/

export default {
    name: "home",
    mounted() {
        //console.log(this.errorLogs);
        this.addErrorLog("ewweewee");
        //console.log(this.errorLogs);
        /* // 登录
         login({username: '32323'})
             .then(result => {
                 console.log(result);
             })
             .catch(result => {
                 console.log(result);
             });
         // 退出
         logout({username: '11112222'})
             .then(result => {
                 console.log(result);
             })
             .catch(result => {
                 console.log(result);
             });*/
    },
    computed: {
        ...mapGetters("errorLog", {
            errorLogs: "errorLogs"
        })
    },
    methods: {
        ...mapActions("errorLog", {
            addErrorLog: "addErrorLog"
        })
    }
};
</script>
