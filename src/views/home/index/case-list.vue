<template>
    <div class="list-bar">
        <p class="list-bar-title">
            <span>经典案例</span>
            <slot></slot>
        </p>
        <ul class="list">
            <li v-for="(item,index) in list" :key="index" class="list-item">
                <img class="item-icon" src="@imgs/case/lock-icon.png"/>
                <p class="item-title">{{item.title}}</p>
                <p class="item-desc">{{item.title}}</p>
            </li>
        </ul>
    </div>
</template>
<script>
// @ is an alias to /src

export default {
    name: "case-list",
    props:['list'],
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
    .list-bar{
        .list-bar-title{
            font-size: 18px;color:$yellow;line-height: 40px;padding: 10px 0;display: flex;justify-content:space-between;
        }
        .list{
            display: flex;flex-direction: row;flex-wrap: wrap;width: 100%;
            .list-item{
                width: calc(25% - 15px);margin:0 0 30px 20px;
                &:nth-child(4n+1){margin-left: 0;}
                .item-icon{height: 180px;width: 100%;}
                .item-title{font-size: 14px;line-height: 24px;color: $yellow;margin-top: 10px;}
                .item-desc{font-size: 12px;line-height: 20px;color:$yellow-1;}
            }
        }
    }
</style>
