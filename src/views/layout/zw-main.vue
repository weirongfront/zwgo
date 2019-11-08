<template>
    <el-main class="zw-main">
        <transition name="fade-transform" mode="out-in">
            <router-view :key="key" />
        </transition>
    </el-main>
</template>
<script>
// @ is an alias to /src
export default {
    name: "zw-main",
    data() {
        return {};
    },
    computed:{
        key() {
            return this.$route.path
        }
    },
    mounted() {
    },
    methods: {
    }
};
</script>
<style lang="scss" scoped>
    .zw-main{background: #fff;margin: 20px;}
</style>
