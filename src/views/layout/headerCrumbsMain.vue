/**
*   头部
*   面包屑
*   main
*/
<template>
    <div class="app-wrapper">
        <app-header></app-header>
        <app-crumbs></app-crumbs>
        <app-main :style="{height:mainHeight}"></app-main>
    </div>
</template>

<script>
import appHeader from '@/components/header';
import appMain from '@/components/main';
import appCrumbs from '@/components/crumbs';
import ResizeMixin from './mixin/ResizeHandler'
import {headerHeight,crumbsHeight} from '@/assets/scss/yt-variables.scss';

export default {
    name: 'headerCrumbsMain',
    components: {
        appHeader,
        appCrumbs,
        appMain
    },
    data(){
        return {
            mainHeight:0
        }
    },
    mixins: [ResizeMixin],
    methods: {
        resize(){
            this.mainHeight = this.app.clientHeight - parseInt(headerHeight) - parseInt(crumbsHeight) - 40 - 20 + 'px';
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
