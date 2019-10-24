<template>
    <div>
        <zw-header></zw-header>
        <el-container :style="{height: this.height}">
            <zw-aside/>
            <zw-main/>
        </el-container>
    </div>
</template>
<script>
// @ is an alias to /src
import ZwAside from "./zw-aside";
import ZwHeader from "./zw-header";
import ZwMain from "./zw-main";

export default {
    name: "dashboard",
    components: {ZwMain, ZwHeader, ZwAside},
    data() {
        return {
            height:(window.innerHeight - 60)+'px'
        }
    },
    computed:{
        key() {
            return this.$route.path
        }
    },
    mounted() {
        window.addEventListener('resize',this.resize);
    },
    methods: {
        resize(){
            this.height = Math.max(window.innerHeight - 60,460)+'px';
        }
    },
    destroyed() {
        window.removeEventListener('resize',this.resize);
    }
};
</script>
<style lang="scss" scoped>
</style>
