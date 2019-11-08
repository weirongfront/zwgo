<template>
    <div class="qrcode-panel" :style="{width:width+'px',height:height+'px'}">
        <canvas ref="qrcanvas" :width="width" :height="height"></canvas>
    </div>
</template>
<script>
// @ is an alias to /src
import QRCode from 'qrcode';

export default {
    name: "zw-qrcode",
    props:{
        content:{
            default: ''
        },
        width:{
            default:100
        },
        height:{
            default:100
        }
    },
    mounted() {
        if(this.content){
            this.drawQrcode();
        }
    },
    methods: {
        drawQrcode(content = this.content){
            QRCode.toCanvas(this.$refs.qrcanvas, content);
        }
    },
    watch:{
        content(val){
            this.drawQrcode(val);
        }
    }
};
</script>
<style lang="scss" scoped>
    .qrcode-panel{
        canvas{width: 100%!important;height: 100%!important;}
    }
</style>
