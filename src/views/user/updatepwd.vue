<template>
    <div class="register-panel">
        <h2 class="register-title">修改密码</h2>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="原密码" prop="oldPassword">
                <el-input type="password" v-model="ruleForm.oldPassword" placeholder="请输入原密码"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="password">
                <el-input type="password" v-model="ruleForm.password" placeholder="请输入新密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
                <el-input type="password" v-model="ruleForm.confirmPassword" placeholder="请再次输入新密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button style="margin-left: 80px;" :loading="loading" type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
// @ is an alias to /src
import {mapGetters,mapActions} from "vuex";
import {updatePwd} from "../../data/modules/user";

export default {
    name: "user-update-pwd",
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm.password !== '') {
                    this.$refs.ruleForm.validateField('confirmPassword');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            ruleForm: {
                oldPassword:'',
                password: '',
                confirmPassword: ''
            },
            loading: false,
            rules: {
                oldPassword: [
                    { required: true, message: '请输入原密码', trigger: 'blur' },
                    { validator: validatePass, trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入新密码', trigger: 'blur' }
                ],
                confirmPassword: [
                    { required: true, message: '请输入确认密码', trigger: 'blur' },
                    { validator: validatePass2, trigger: 'blur' }
                ]
            }
        };
    },
    computed:{
        ...mapGetters('user',{info:'info'})
    },
    methods: {
        ...mapActions('user',{logout:'logout'}),
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.loading = true;
                    this.ruleForm.name = this.info.name;
                    updatePwd(this.ruleForm).then(res => {
                        this.loading = false;
                        if(res.status === 0){
                            this.$alert('密码修改成功，请重新登录!', {
                                confirmButtonText: '确定',
                                callback: () => {
                                    this.logout().then(()=>{
                                        this.$router.push('/login');
                                    });
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
