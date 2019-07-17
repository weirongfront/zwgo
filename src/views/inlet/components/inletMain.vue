<template>
    <div class="inletMain">
        <ul class="inline-ul zdy-col3">
            <li v-for="(item, index) in inletList" :key="index">
                <div class="zdy-icon">
                    <svg-icon :icon-class="item.target === 0 ? 'onetarget-choose' : (
                    item.target === 1 ? 'evaluation-choose' : (
                    item.target === 2 ? 'concent-choose' : ''
                    ))"/>
                </div>
                <p class="system-title">{{item.name}}</p>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: "login",
    data() {
        return {
            inletList: [
                {
                    target: 0,
                    name: "译泰运营管理系统"
                },
                {
                    target: 1,
                    name: "测评运营系统"
                },
                {
                    target: 2,
                    name: "内容发布管理系统"
                }
            ]
        };
    },
    methods: {}
};
</script>
<style  lang="scss" scoped>
    .inletMain {
        min-width: 990px;
        /*max-width: 1860px;*/
        margin: 0 auto;
        margin-right: 2%;
        margin-left: 2%;
    }
    .inline-ul {
        display: block;
        font-size: $font-none-size;
        li {
            display: inline-block;
            background-color: $content-bg-color;
            list-style-type: none;
            width: 32%;
           /* height: 290px;*/
            margin-right: 2%;
            margin-top: 2%;
            font-size: $font-f2-size;
            cursor: pointer;
            padding: 3% 0;
            span {
                width: 120px;
                height: 120px;
                margin: 0 auto;
                display: block;
                line-height: 120px;
                font-size: 38px;
                text-align: center;
            }
        }
    }
    .zdy-icon {
        font-size: 120px;
        text-align: center;
    }
    .zdy-col3 {
        li:nth-child(3n + 3) {
            margin-right: 0;
        }
    }
    .system-title {
        font-size: $font-f2-size;
        color: $font-black1-color;
        letter-spacing: 0;
        margin-top: 34px;
        text-align: center;
    }
</style>
