/**
*   头部
*   left
*   main
*/
<template>
    <div class="app-wrapper">
        <app-header></app-header>
        <div class="clearfix" :style="{height:mainHeight}">
            <app-sidebar class="fl sidebar"></app-sidebar>
            <app-main class="fl main"></app-main>
        </div>
    </div>
</template>

<script>
import appHeader from '@/components/header';
import appMain from '@/components/main';
import appSidebar from '@/components/sidebar.vue';
import {headerHeight} from '@/assets/scss/yt-variables.scss';
import ResizeMixin from './mixin/ResizeHandler';

export default {
    name: 'headerLeftMain',
    mixins: [ResizeMixin],
    components: {
        appHeader,
        appSidebar,
        appMain
    },
    data(){
        return {
            mainHeight:0
        }
    },
    methods:{
        resize(){
            this.mainHeight = this.app.clientHeight - parseInt(headerHeight) + 'px';
        }
    }
}
</script>

<style lang="scss" scoped>
    .main{width: calc(100% - #{$sidebarWidth+px} - 40px)}
</style>
