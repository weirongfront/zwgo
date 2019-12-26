<template>
    <el-footer height="80px" class="clearfix zw-header">
        <p class="fl line-text">版权所有 <a href="http://beian.miit.gov.cn">京ICP备19031760号</a></p>
        <p class="fl line-text ml80">联系微信：836600877</p>
        <div class="fr clearfix">
            <div class="fl line-text mr30">
               捐赠
            </div>
            <div class="fl pay-box">
                <img src="@imgs/pay/wepay.jpeg">
                <p>微信扫码</p>
            </div>
            <div class="fl pay-box">
                <img src="@imgs/pay/alipay.jpeg">
                <p>支付宝码</p>
            </div>
        </div>
    </el-footer>
</template>
<script>
// @ is an alias to /src
import {mapGetters,mapActions} from "vuex";

export default {
    name: "zw-footer",
    computed:{
        ...mapGetters('user',{nickname:'nickname'}),
        key() {
            return this.$route.path
        }
    },
    mounted() {
    },
    methods: {
        ...mapActions('user',{logout:'logout'}),
        handleCommand(command){
            if(command === 'logout'){
                this.logout().then(()=>{
                    this.$router.push('/login');
                });
            }
        }
    }
};
</script>
<style lang="scss" scoped>
    .el-footer {
        font-size: 16px;background: #2b2a22;display: block;color:#f5bf45;position: relative;
        .line-text{line-height: 80px;}
        .mr30{margin-right: 30px;}
        .ml80{margin-left: 80px;}
        .pay-box{
            padding-top: 4px;width: 80px;height:80px;font-size: 12px;text-align: center;line-height: 14px;
            img{width: 60px;height: 60px;display: block;margin: 0 auto;}
        }
    }
</style>
