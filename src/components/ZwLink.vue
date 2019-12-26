<template>
    <span class="zw-link" @click="toPage">
        <slot></slot>
    </span>
</template>
<script>
export default {
    name: "ZwLink",
    props:['route'],
    methods:{
        toPage(){
            this.$router.push(this.route);
        }
    }
};
</script>
<style lang="scss" scoped>
    .zw-link{
        font-size: 14px;color: $yellow-1;
        &:hover{color: $yellow;cursor: pointer;}
    }
</style>
