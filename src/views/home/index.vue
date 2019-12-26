<template>
    <div class="index-body">
        <tool-list v-show="toolList.length" :list="toolList">
            <zw-link route="/video/list">查看更多</zw-link>
        </tool-list>
        <case-list v-show="caseList.length" :list="caseList">
            <zw-link route="/video/list">查看更多</zw-link>
        </case-list>
        <video-list v-show="videoList.length" :list="videoList">
            <zw-link route="/video/list">查看更多</zw-link>
        </video-list>
        <audio-list v-show="audioList.length" :list="audioList">
            <zw-link route="/video/list">查看更多</zw-link>
        </audio-list>
        <index-carousel class="mt30"></index-carousel>
    </div>
</template>
<script>
// @ is an alias to /src
import IndexCarousel from "./index/carousel";
import VideoList from "./index/video-list";
import AudioList from "./index/audio-list";
import ToolList from "./index/tool-list";
import CaseList from "./index/case-list";
import {getHomeVideoList} from "../../data/modules/video";
import ZwLink from "../../components/ZwLink";

export default {
    name: "dashboard",
    components: {ZwLink, CaseList, ToolList, AudioList, VideoList, IndexCarousel},
    data() {
        return {
            caseList:[{title:'时钟',icon:''}],
            audioList:[{title:''}],
            videoList:[],
            toolList:[
                {title:'二维码生成',icon:'el-icon-s-grid',url:'/tools/qrcode'},
                {title:'JSON格式化',icon:'el-icon-s-claim',url:''},
                {title:'笔记本',icon:'el-icon-s-management',url:'/tools/notebook'}
            ]
        }
    },
    computed:{
        key() {
            return this.$route.path
        }
    },
    mounted() {
        this.getHomeList();
    },
    methods: {
        getHomeList(){
            getHomeVideoList().then(res => {
                this.videoList = res;
            });
        },
        toPage(path){
            this.$router.push({path:path});
        }
    },
    destroyed() {
    }
};
</script>
<style lang="scss" scoped>
</style>
