<template>
    <div class="qrcode-panel">
        <canvas ref="qrcanvas" width="100" height="100"></canvas>
    </div>
</template>
<script>
// @ is an alias to /src
import QRCode from 'qrcode';

export default {
    name: "zw-qrcode",
    props:['content'],
    mounted() {
        this.drawQrcode();
    },
    methods: {
        drawQrcode(){
            QRCode.toCanvas(this.$refs.qrcanvas, this.content);
        }
    }
};
</script>
<style lang="scss" scoped>
    .rqcode-panel{

    }
</style>
