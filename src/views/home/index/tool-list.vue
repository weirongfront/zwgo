<template>
    <div class="list-bar">
        <p class="list-bar-title">
            <span>工具箱</span>
            <slot></slot>
        </p>
        <ul class="list">
            <li v-for="(item,index) in list" :key="index" @click="toPage(item.url)" class="list-item">
                <i :class="item.icon"></i>
                <p class="item-title">{{item.title}}</p>
            </li>
        </ul>
    </div>
</template>
<script>
// @ is an alias to /src

export default {
    name: "tool-list",
    props:['list'],
    data() {
        return {}
    },
    methods: {
        toPage(path){
            this.$router.push(path);
        }
    },
    destroyed() {
    }
};
</script>
<style lang="scss" scoped>
    .list-bar{
        .list-bar-title{
            font-size: 18px;color:$yellow;line-height: 40px;padding: 10px 0;display: flex;justify-content:space-between;
        }
        .list{
            display: flex;flex-direction: row;flex-wrap: wrap;width: 100%;margin-top: 30px;
            .list-item{
                width: calc(10% - 15px);margin:0 0 30px 20px;text-align: center;cursor: pointer;color: $yellow;
                &:nth-child(4n+1){margin-left: 0;}
                &:hover{color: $yellow-1;}
                i{font-size: 50px;}
                .item-title{font-size: 14px;line-height: 24px;margin-top: 10px;}
            }
        }
    }
</style>
