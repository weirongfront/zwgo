<template>
    <div>
        <zw-header></zw-header>
        <zw-main :style="{minHeight: this.height}"></zw-main>
        <zw-footer></zw-footer>
    </div>
</template>
<script>
// @ is an alias to /src
import ZwHeader from "./zw-header";
import ZwMain from "./zw-main";
import ZwFooter from "./zw-footer";

export default {
    name: "headermainfooter",
    components: {ZwFooter, ZwMain, ZwHeader},
    data() {
        return {
            height:(window.innerHeight - 60 - 80 - 40)+'px'
        }
    },
    mounted() {
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
</style>
