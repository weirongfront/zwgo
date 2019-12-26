<template>
    <div>
        <zw-header class="header"></zw-header>
        <zw-main class="zw-body" :style="{minHeight: this.height}"></zw-main>
        <zw-footer class="footer"></zw-footer>
        <zw-bg></zw-bg>
    </div>
</template>
<script>
// @ is an alias to /src
import ZwHeader from "./zw-header";
import ZwMain from "./zw-main";
import ZwFooter from "./zw-footer";
import ZwBg from "./zw-bg";

export default {
    name: "headermainfooter",
    components: {ZwBg, ZwFooter, ZwMain, ZwHeader},
    data() {
        return {
            height:(window.innerHeight - 60 - 80 - 40)+'px'
        }
    },
    mounted() {
        this.resize();
        window.addEventListener('resize',this.resize);
    },
    methods: {
        resize(){
            this.height = Math.max(window.innerHeight - 60 - 80 - 40,460)+'px';
        }
    },
    destroyed() {
        window.removeEventListener('resize',this.resize);
    }
};
</script>
<style lang="scss" scoped>
    $z-index:2;
    .header,.footer{z-index: $z-index;}
    .zw-body{
        padding:30px;background: rgba(0,0,0,.3);width: 1190px;margin: 20px auto;box-shadow:0 5px 5px 5px #2d3a4b;position: relative;z-index: $z-index;
    }
</style>
