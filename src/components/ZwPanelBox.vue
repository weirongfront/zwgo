<template>
    <div class="zw-panel-box">
        <p class="panel-title">{{title}}</p>
        <div class="panel-content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: "ZwPanelBox",
    props:{
        title:{
            default: ''
        }
    }
};
</script>
<style lang="scss" scoped>
    .panel-title{font-size: 16px;line-height: 30px;color:$yellow;margin: 30px 0 10px;}
    .panel-content{
        border:1px solid $yellow;display: flex;flex-direction: row;flex-wrap: wrap;width: 100%;padding: 20px;
    }
</style>
