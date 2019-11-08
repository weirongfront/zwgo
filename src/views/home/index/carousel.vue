<template>
    <el-carousel class="carousel" :interval="4000" type="card" height="300px">
        <el-carousel-item>
            <img src="@imgs/index/carousel-1.jpg">
        </el-carousel-item>
        <el-carousel-item>
            <img src="@imgs/index/carousel-2.jpg">
        </el-carousel-item>
        <el-carousel-item>
            <img src="@imgs/index/carousel-3.jpg">
        </el-carousel-item>
        <el-carousel-item>
            <img src="@imgs/index/carousel-4.jpg">
        </el-carousel-item>
    </el-carousel>
</template>
<script>
// @ is an alias to /src

export default {
    name: "index-carousel",
    data() {
        return {}
    },
    methods: {
    },
    destroyed() {
    }
};
</script>
<style lang="scss" scoped>
    .carousel{}
    .el-carousel__item img {
        display: block;width: 100%;height: 100%;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>
