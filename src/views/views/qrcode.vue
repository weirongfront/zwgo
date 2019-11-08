<template>
    <div class="qr-panel">
        <div class="clearfix">
            <el-input rows="10" class="fl qr-text" type="textarea" v-model="info" placeholder="请输入要生成的内容"></el-input>
            <zw-qrcode class="fl" :height="150" :width="150" :content="content"></zw-qrcode>
        </div>
        <el-button type="primary" @click="draw">生成二维码</el-button>
    </div>
</template>
<script>
// @ is an alias to /src
import ZwQrcode from "../../components/zw-qrcode";

export default {
    name: "tool-qrcode",
    components: {ZwQrcode},
    data() {
        return {
            info:'',
            content:''
        }
    },
    methods:{
        draw(){
            this.content = this.info;
        }
    }
};
</script>
<style lang="scss" scoped>
    .qr-panel{
        .qr-text{width: 500px;height: 300px;}
    }
    .qr-text{width: 500px;height: 400px;}

</style>
