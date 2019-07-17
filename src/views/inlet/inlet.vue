<template>
    <div class="inlet">
        <app-header></app-header>
        <inlet-main></inlet-main>
    </div>
</template>
<script>
import appHeader from '@/components/header';
import inletMain from '@/views/inlet/components/inletMain';

export default {
    name: "login",
    components: {
        appHeader,
        inletMain
    },
    data() {
        return {}
    },
    methods: {}
};
</script>
<style  lang="scss" scoped>
</style>
