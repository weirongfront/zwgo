<template>
    <div class="main">
        <transition name="fade-transform" mode="out-in">
            <keep-alive>
                <router-view :key="key" />
            </keep-alive>
        </transition>
    </div>
</template>

<script>
// @ is an alias to /src
import {mapGetters, mapActions} from 'vuex';
export default {
    name: "app-main",
    data(){
        return {};
    },
    mounted() {
        this.addErrorLog('ewweewee');
    },
    computed: {
        ...mapGetters('errorLog', {
            errorLogs: 'errorLogs'
        }),
        key() {
            return this.$route.path
        }
    },
    methods: {
        ...mapActions('errorLog', {
            addErrorLog: 'addErrorLog'
        })
    }
};
</script>
<style lang="scss" scoped>
    .main{
        width: calc(100% - 40px);
        height: calc(100% - 40px);
        margin: 20px;
        background: #fff;
    }
</style>
