<template>
    <div>
        <video class="video-box" :poster="video.icon" controls="controls" :src="video.url"></video>
        <p class="video-title">{{info.name+' '+(video.name || '')}}</p>
        <zw-panel-box v-if="info.list && info.list.length && info.list.length > 1" title="剧集" class="video-list">
            <div v-for="(item,index) in info.list" class="video-item" :class="{active:video.Id === item.Id}" :key="index" @click="playOne(item)">
                <el-image class="item-icon" :src="item.icon"></el-image>
                <p class="item-name">{{item.name}}</p>
            </div>
        </zw-panel-box>
        <zw-panel-box title="剧情介绍">
            <div class="detail-desc">
                {{video.desc || info.desc}}
            </div>
        </zw-panel-box>
    </div>
</template>
<script>
// @ is an alias to /src

import ZwPanelBox from "../../components/ZwPanelBox";
import {getVideoById} from "../../data/modules/video";
import getPageTitle from "../../utils/get-page-title";
export default {
    name: "video-detail",
    components: {ZwPanelBox},
    data() {
        return {
            id:this.$route.query.id,
            video:{},
            info:{}
        }
    },
    mounted() {
        this.getVideo();
    },
    methods: {
        getVideo(){
            getVideoById({id:this.id}).then(res => {
                if(res.code === 0){
                    this.info = res.data;
                    this.info.list.length && this.playOne(this.info.list[0]);
                }else{
                    this.$alert(res.msg);
                }
            });
        },
        playOne(item){
            this.video = item;
            document.title = getPageTitle(this.info.name+' '+this.video.name);
        }
    }
};
</script>
<style lang="scss" scoped>
    .video-box{background: #000;width: 100%;height: 636px;}
    .detail-desc{font-size: 14px;color: $yellow-1;}
    .video-title{color: $yellow;font-size: 16px;background: rgba(0,0,0,.3);padding: 10px 8px;margin-top: 10px;}
    .video-item{
        margin: 12px;width: 112px;background: rgba(0,0,0,.3);cursor: pointer;
        &.active{box-shadow: 0 0 1px 1px $yellow;transform: scale(1.2);}
        &:hover{transform: scale(1.3);}
        .item-icon{height: 63px;width: 100%;}
        .item-name{text-align: center;color: $yellow;font-size: 12px;line-height: 18px;padding-bottom: 3px;}
    }
</style>
