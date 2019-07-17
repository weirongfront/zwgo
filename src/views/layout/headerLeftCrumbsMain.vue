/**
*   头部
*   left
*   面包屑
*   main
*/
<template>
    <div class="app-wrapper">
        <app-header></app-header>
        <div class="clearfix">
            <app-sidebar class="fl" :style="{height:contentHeight}"></app-sidebar>
            <div class="fl right-panel" :style="{height:contentHeight}">
                <app-crumbs></app-crumbs>
                <app-main :style="{height:mainHeight}" class="main"></app-main>
            </div>
        </div>
    </div>
</template>

<script>
import appHeader from '@/components/header';
import appMain from '@/components/main';
import appSidebar from '@/components/sidebar.vue';
import appCrumbs from '@/components/crumbs';
import {headerHeight,crumbsHeight} from '@/assets/scss/yt-variables.scss';
import ResizeMixin from './mixin/ResizeHandler';

export default {
    name: 'headerLeftCrumbsMain',
    mixins: [ResizeMixin],
    components: {
        appHeader,
        appSidebar,
        appCrumbs,
        appMain
    },
    data(){
        return {
            mainHeight:0,
            contentHeight:0
        }
    },
    methods:{
        resize(){
            let h = this.app.clientHeight - parseInt(headerHeight);
            this.contentHeight = h + 'px';
            this.mainHeight = h -parseInt(crumbsHeight) - 20 - 40 + 'px';
        }
    }
}
</script>

<style lang="scss" scoped>
    .right-panel{width: calc(100% - #{$sidebarWidth+px});height: 100%;}
</style>
