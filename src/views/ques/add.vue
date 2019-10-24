<template>
    <div class="register-panel">
        <h2 class="register-title">新增问卷</h2>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="问卷标题" prop="title">
                <el-input v-model="ruleForm.title" placeholder="请填写问卷标题"></el-input>
            </el-form-item>
            <el-form-item label="有效期至" prop="activeTime" required>
                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.activeTime" style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item label="问卷题目" prop="quesList" required>
                <ul class="ques-list">
                    <li v-for="(ques,index) in ruleForm.quesList" :key="index" class="mt20">
                        <p class="ques-title">
                            {{(index+1)+'、'+ques.title}}
                            <el-button style="margin-left: 30px;" type="primary" @click="delQues(index)" size="small">删除此题</el-button>
                        </p>
                        <div>
                            <el-radio-group v-if="ques.type === 1" class="full-option" v-model="ques.answer">
                                <el-radio border v-for="(option,index) in ques.options" :label="index" :key="index">{{option.title}}</el-radio>
                            </el-radio-group>
                            <el-checkbox-group v-else-if="ques.type === 2" class="full-option" v-model="ques.answer">
                                <el-checkbox border v-for="(option,index) in ques.options" :label="index" :key="index">{{option.title}}</el-checkbox>
                            </el-checkbox-group>
                            <el-input v-else-if="ques.type === 3" v-model="ques.answer"></el-input>
                            <el-input v-else-if="ques.type === 4" v-model="ques.answer" type="textarea"></el-input>
                        </div>
                    </li>
                </ul>
            </el-form-item>
            <el-form-item>
                <el-button style="margin-left: 80px;margin-bottom: 80px;" type="primary" @click="openAddBox">增加题目</el-button>
            </el-form-item>
            <el-form-item>
                <el-button style="margin-left: 80px;" :loading="loading" type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
        <el-dialog title="新增题目" :visible.sync="dialogFormVisible">
            <el-form :model="quesForm" ref="quesForm" :rules="quesRules">
                <el-form-item label="题目名称" prop="title">
                    <el-input v-model="quesForm.title" placeholder="请输入题目名称"></el-input>
                </el-form-item>
                <el-form-item label="题目类型">
                    <el-radio-group v-model="quesForm.type">
                        <el-radio :label="1" name="type">单选</el-radio>
                        <el-radio :label="2" name="type">多选</el-radio>
                        <el-radio :label="3" name="type">信息</el-radio>
                        <el-radio :label="4" name="type">问答</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-if="quesForm.type === 1 || quesForm.type === 2" label="题目选项">
                    <div>：<span class="option-tip">{{optionTip}}</span></div>
                    <ul class="ques-option-list">
                        <li v-for="(option,index) in quesForm.options" :key="index">
                            <el-input class="option-text" v-model="option.title" placeholder="请输入选项内容"></el-input>
                            <el-button class="option-btn" @click="delQuesOption(index)">删除</el-button>
                        </li>
                    </ul>
                    <el-button class="mt20" type="primary" @click="addQuesOption">增加选项</el-button>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addQues">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
// @ is an alias to /src
import {mapGetters} from "vuex";
import {add} from "../../data/modules/ques";

export default {
    name: "user-info",
    data() {
        let quesVali = (rule, value, callback) => {
            if (!value || value.length === 0) {
                callback(new Error('请增加题目'));
            } else {
                let errNo = [];
                value.map((ques,index)=>{
                    if(ques.type === 1 && ques.answer === ''){
                        errNo.push(index+1);
                    }else if(ques.type === 2 && ques.answer.length === 0){
                        errNo.push(index+1);
                    }
                });
                if(errNo.length){
                    callback(new Error('选择题必须选出正确答案！'));
                }else{
                    callback();
                }
            }
        };
        return {
            dialogQRVisible:false,
            dialogFormVisible:false,
            quesForm:{},
            ruleForm: {
                activeTime: new Date(),
                title:'',
                quesList:[],
            },
            loading: false,
            optionTip:'',
            rules: {
                title: [
                    { required: true, message: '请输入标题', trigger: 'blur' },
                    { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
                ],
                activeTime: [
                    { type: 'date', required: true, message: '请选择有效日期', trigger: 'change' }
                ],
                quesList:[
                    { validator: quesVali}
                ]
            },
            quesRules: {
                title: [
                    { required: true, message: '请输入题目名称', trigger: 'blur' },
                    { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
                ]
            },
            quesLink:''
        };
    },
    computed:{
        ...mapGetters('user',{info:'info'})
    },
    mounted() {
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.loading = true;
                    add(this.ruleForm).then(() => {
                        this.loading = false;
                        this.$alert('添加成功!', {
                            confirmButtonText: '确定',
                            callback: () => {
                                this.$router.push('/ques/list');
                            }
                        });
                    }).catch(() => {
                        this.loading = false;
                    });
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        addQues(){
            this.$refs['quesForm'].validate((valid) => {
                if (valid) {
                    let pass = true;
                    if(this.quesForm.type === 1 || this.quesForm.type === 2){
                        if(this.quesForm.options && this.quesForm.options.length){
                            this.quesForm.options.map((item) => {
                                if(item.title === ''){
                                    this.optionTip = '选项内容不能为空！';
                                    pass = false;
                                }
                            })
                        }else {
                            this.optionTip = '请增加选项';
                            pass = false;
                        }
                    }
                    if(pass){
                        let ques = JSON.parse(JSON.stringify(this.quesForm));
                        if(ques.type === 2){
                            ques.answer = [];
                        }else{
                            ques.answer = '';
                        }
                        this.ruleForm.quesList.push(ques);
                        this.dialogFormVisible = false;
                    }
                } else {
                    return false;
                }
            });
        },
        delQues(index){
            this.ruleForm.quesList.splice(index,1);
        },
        openAddBox(){
            this.quesForm = {
                type:1,
                options:[{title:''}]
            };
            this.dialogFormVisible = true;
        },
        addQuesOption(){
            this.quesForm.options.push({title:''});
        },
        delQuesOption(index){
            this.quesForm.options.splice(index,1);
        }
    }
};
</script>
<style lang="scss" scoped>
    .register-panel{
        padding: 0 30px 100px;
        .register-title{text-align: center;width: 100%;font-size: 18px;padding: 30px 0 60px;}
        .option-tip{color:#F56C6E;font-size: 14px;}
        .ques-option-list{
            display: block;padding-bottom: 20px;
            li{margin-top: 20px;}
            .option-btn{width: 70px;margin-left: 10px;}
            .option-text{width: calc(100% - 85px);display: inline-block;}
        }
        .ques-list{
            border: 1px solid #ccc;padding: 20px;border-radius: 5px;
            .ques-title{font-size: 16px;color: #333;}
        }
    }
</style>
