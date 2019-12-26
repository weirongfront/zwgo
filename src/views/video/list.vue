<template>
    <div>
        <video-list :list="videoList"></video-list>
    </div>
</template>
<script>
// @ is an alias to /src
import {parseTime} from "../../utils";
import VideoList from "../home/index/video-list";
import {getVideoList} from "../../data/modules/video";

export default {
    name: "video-list-page",
    components: {VideoList},
    data() {
        return {
            videoList: []
        }
    },
    mounted() {
        this.getVideoList();
    },
    methods: {
        beginDateFormater(row){
            return parseTime(new Date(row.begintime));
        },
        endDateFormater(row){
            return parseTime(new Date(row.endtime));
        },
        getVideoList(){
            getVideoList().then(list => {
                this.videoList = list;
            });
        }
    }
};
</script>
<style lang="scss" scoped>

</style>
