<template>
    <div class="register-panel">
        <h2 class="register-title">用户注册</h2>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="登录名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
                <el-input v-model="ruleForm.nickname"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item label="出生日期" prop="birthday" required>
                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.birthday" style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item label="性别" prop="gender">
                <el-radio-group v-model="ruleForm.gender">
                    <el-radio :label="0">男</el-radio>
                    <el-radio :label="1">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button style="margin-left: 80px;" :loading="loading" type="primary" @click="submitForm('ruleForm')">立即注册</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
// @ is an alias to /src
import {register} from "../../data/modules/user";

export default {
    name: "user-info",
    data() {
        return {
            ruleForm: {
                name: '',
                nickname:'',
                password: '',
                birthday: new Date(),
                gender: 0
            },
            loading: false,
            rules: {
                name: [
                    { required: true, message: '请输入登录名', trigger: 'blur' },
                    { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
                ],
                nickname: [
                    { required: true, message: '请输入昵称', trigger: 'blur' },
                    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入登录密码', trigger: 'blur' }
                ],
                birthday: [
                    { type: 'date', required: true, message: '请选择出生日期', trigger: 'change' }
                ]
            }
        };
    },
    mounted() {
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.loading = true;
                    register(this.ruleForm).then(res => {
                        this.loading = false;
                        if(res.status === 0){
                            this.$alert('恭喜您，注册成功!', {
                                confirmButtonText: '确定',
                                callback: () => {
                                    this.$router.push('/login');
                                }
                            });
                        }else{
                            this.$alert(res.tip, {
                                confirmButtonText: '确定'
                            });
                        }
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
        }
    }
};
</script>
<style lang="scss" scoped>
    .register-panel{
        width: 600px;margin: 0 auto;background: #fff;padding: 0 30px 100px;border-radius: 20px;
        .register-title{text-align: center;width: 100%;font-size: 18px;padding: 30px 0 60px;}
    }
</style>
