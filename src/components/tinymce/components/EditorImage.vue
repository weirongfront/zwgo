<template>
    <div class="upload-container">
        <el-button :style="{background:color,borderColor:color}" icon="el-icon-upload" size="mini" type="primary" @click=" dialogVisible=true">
            上传
        </el-button>
        <el-dialog title="文件上传" :visible.sync="dialogVisible">
            <el-upload
                :multiple="true"
                :file-list="fileList"
                :show-file-list="true"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
                :before-upload="beforeUpload"
                class="editor-slide-upload"
                :action="uploadUrl+'upload'"
                list-type="picture-card"
            >
                <el-button size="small" type="primary">
                    选择文件
                </el-button>
            </el-upload>
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="handleSubmit">确定</el-button>
        </el-dialog>
    </div>
</template>

<script>
import {theme} from '@/assets/scss/yt-variables.scss';
import {baseUrl} from '@/config';

export default {
    name: 'EditorSlideUpload',
    props: {
        color: {
            type: String,
            default: theme
        }
    },
    data() {
        return {
            dialogVisible: false,
            listObj: {},
            fileList: [],
            uploadUrl:baseUrl
        }
    },
    methods: {
        checkAllSuccess() {
            return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
        },
        handleSubmit() {
            const arr = Object.keys(this.listObj).map(v => this.listObj[v])
            if (!this.checkAllSuccess()) {
                this.$message('请等待所有文件成功上载。如果存在网络问题，请刷新页面并重新上载!');
                return
            }
            this.$emit('successCBK', arr)
            this.listObj = {}
            this.fileList = []
            this.dialogVisible = false
        },
        handleSuccess(response, file) {
            const uid = file.uid;
            const objKeyArr = Object.keys(this.listObj);
            for (let i = 0, len = objKeyArr.length; i < len; i++) {
                if (this.listObj[objKeyArr[i]].uid === uid) {
                    this.listObj[objKeyArr[i]].url = response.data.fileUrl;
                    this.listObj[objKeyArr[i]].hasSuccess = true;
                    return
                }
            }
        },
        handleRemove(file) {
            const uid = file.uid
            const objKeyArr = Object.keys(this.listObj)
            for (let i = 0, len = objKeyArr.length; i < len; i++) {
                if (this.listObj[objKeyArr[i]].uid === uid) {
                    delete this.listObj[objKeyArr[i]]
                    return
                }
            }
        },
        beforeUpload(file) {
            const _self = this
            const _URL = window.URL || window.webkitURL;
            const fileName = file.uid;
            this.listObj[fileName] = {};
            return new Promise((resolve) => {
                //if(file)
                const img = new Image();
                img.src = _URL.createObjectURL(file);
                img.onload = function () {
                    _self.listObj[fileName] = {
                        hasSuccess: false,
                        uid: file.uid,
                        width: this.width,
                        height: this.height
                    }
                };
                resolve(true)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .editor-slide-upload {
        margin-bottom: 20px;
        >>> .el-upload--picture-card {
            width: 100%;
        }
    }
</style>
