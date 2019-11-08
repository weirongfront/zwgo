<template>
    <div class="book-panel">
        <el-input rows="10" class="book-title" v-model="info" placeholder="请输入笔记名称"></el-input>
        <el-button class="ml20" type="primary" @click="submit">保存</el-button>
        <div class="mt20">
            <tinymce ref="editor" v-model="content" :height="400" />
        </div>
    </div>
</template>
<script>
// @ is an alias to /src

import Tinymce from "../../components/tinymce/index";
export default {
    name: "tool-notebook",
    components: {Tinymce},
    data() {
        return {
            info:'',
            content:''
        }
    },
    methods:{
        submit(){
            this.content = this.info;
        }
    }
};
</script>
<style lang="scss" scoped>
    .book-panel{
        .book-title{width: 500px;}
    }
</style>
