/**
*   头部
*   main
*/
<template>
    <div class="app-wrapper">
        <app-header></app-header>
        <app-main :style="{height:mainHeight}"></app-main>
    </div>
</template>

<script>
import appHeader from '@/components/header';
import appMain from '@/components/main';
import ResizeMixin from './mixin/ResizeHandler';
import {headerHeight} from '@/assets/scss/yt-variables.scss';

export default {
    name: 'headerMain',
    mixins: [ResizeMixin],
    components: {
        appHeader,
        appMain
    },
    data(){
        return {
            mainHeight:0
        }
    },
    methods:{
        resize(){
            this.mainHeight = this.app.clientHeight - parseInt(headerHeight) - 40 + 'px';
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
