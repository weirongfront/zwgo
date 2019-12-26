<template>
    <div class="list-bar">
        <p class="list-bar-title">
            <span>影视专区</span>
            <slot></slot>
        </p>
        <ul class="list">
            <li v-for="item in list" :key="item.Id" class="list-item" @click="toVideoDetail(item.Id)">
                <el-image class="item-icon" :src="item.icon" lazy></el-image>
                <p class="item-title">{{item.name}}</p>
                <p class="item-desc">{{item.shortdesc}}</p>
            </li>
        </ul>
    </div>
</template>
<script>
// @ is an alias to /src

export default {
    name: "video-list",
    props:['list'],
    data() {
        return {}
    },
    methods: {
        toVideoDetail(id){
            this.$router.push({path:'/video/detail',query:{id}});
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
            display: flex;flex-direction: row;flex-wrap: wrap;width: 100%;
            .list-item{
                width: calc(25% - 15px);margin:0 0 30px 20px;cursor: pointer;
                &:nth-child(4n+1){margin-left: 0;}
                .item-icon{height: 180px;width: 100%;display: block;}
                .item-title{font-size: 14px;line-height: 24px;color: $yellow;margin-top: 10px;}
                .item-desc{font-size: 12px;line-height: 20px;color:$yellow-1;}
            }
        }
    }
</style>
