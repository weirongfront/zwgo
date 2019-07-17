<template>
    <div class="login-container">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
            <div class="title-container">
                <img src="@imgs/login/logins_logo.png"/>
            </div>
            <div class="content-container">
                <el-form-item prop="username" :class="{'input-focus':userfocus}">
                    <span class="svg-container">
                        <svg-icon icon-class="account"/>
                    </span>
                    <el-input ref="username" v-model="loginForm.username" placeholder="请输入您的账号" name="username" type="text" tabindex="1" autocomplete="on"/>
                </el-form-item>
                <el-tooltip v-model="capsTooltip" content="键盘大写已打开" placement="right" manual>
                    <el-form-item prop="password" :class="{'input-focus':pwdfocus}">
                        <span class="svg-container">
                            <svg-icon icon-class="password"/>
                        </span>
                        <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType" placeholder="请输入您的密码" name="password" tabindex="2" autocomplete="on" @keyup.native="checkCapslock" @blur="capsTooltip = false" @keyup.enter.native="handleLogin"/>
                        <span class="show-pwd" @click="showPwd">
                            <svg-icon icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"/>
                        </span>
                    </el-form-item>
                </el-tooltip>
                <div class="clearfix">
                    <el-form-item prop="verifi" class="fl verifi">
                        <span class="svg-container">
                            <svg-icon icon-class="verification-code"/>
                        </span>
                        <el-input maxlength="4" ref="verifi" v-model="loginForm.verifi" placeholder="请输入验证码" name="verifi" type="text" tabindex="3"/>
                    </el-form-item>
                    <img class="verifi-img" @click="changeVerifi($event)" src="@imgs/login/logins_verificationcode.png"/>
                </div>
                <el-button class="big-btn" :loading="loading" type="primary" @click.native.prevent="handleLogin">登录</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
import {validUsername} from '@/utils/validate'

export default {
    name: 'login',
    data() {
        const validateUsername = (rule, value, callback) => {
            if (!validUsername(value)) {
                callback(new Error('请输入用户名'))
            } else {
                callback()
            }
        }
        const validatePassword = (rule, value, callback) => {
            if (value.length < 6) {
                callback(new Error('请输入密码'))
            } else {
                callback()
            }
        }
        const validateVerifi = (rule, value, callback) => {
            if (value.length < 4) {
                callback(new Error('请输入验证码'))
            } else {
                callback()
            }
        }
        return {
            loginForm: {
                username: '',
                password: '',
                verifi:''
            },
            loginRules: {
                username: [{required: true, trigger: 'blur', validator: validateUsername}],
                password: [{required: true, trigger: 'blur', validator: validatePassword}],
                verifi: [{required: true, trigger: 'blur', validator: validateVerifi}]
            },
            passwordType: 'password',
            capsTooltip: false,
            loading: false,
            showDialog: false,
            redirect: undefined,
            otherQuery: {},
            userfocus:false,
            pwdfocus:false
        }
    },
    watch: {
        $route: {
            handler: function (route) {
                const query = route.query;
                if (query) {
                    this.redirect = query.redirect
                    this.otherQuery = this.getOtherQuery(query)
                }
            },
            immediate: true
        }
    },
    created() {
        // window.addEventListener('storage', this.afterQRScan)
    },
    mounted() {
        if (this.loginForm.username === '') {
            this.$refs.username.focus()
        } else if (this.loginForm.password === '') {
            this.$refs.password.focus()
        }else if(this.loginForm.verifi === ''){
            this.$refs.verifi.focus();
        }
    },
    destroyed() {
        // window.removeEventListener('storage', this.afterQRScan)
    },
    methods: {
        changeVerifi(event){
            //event.target.src = '';
        },
        checkCapslock({shiftKey, key} = {}) {
            if (key && key.length === 1) {
                if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
                    this.capsTooltip = true
                } else {
                    this.capsTooltip = false
                }
            }
            if (key === 'CapsLock' && this.capsTooltip === true) {
                this.capsTooltip = false
            }
        },
        showPwd() {
            if (this.passwordType === 'password') {
                this.passwordType = ''
            } else {
                this.passwordType = 'password'
            }
            this.$nextTick(() => {
                this.$refs.password.focus()
            })
        },
        handleLogin() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.loading = true
                    this.$store.dispatch('user/login', this.loginForm)
                        .then(() => {
                            this.$router.push({path: this.redirect || '/', query: this.otherQuery})
                            this.loading = false
                        })
                        .catch(() => {
                            this.loading = false
                        })
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        getOtherQuery(query) {
            return Object.keys(query).reduce((acc, cur) => {
                if (cur !== 'redirect') {
                    acc[cur] = query[cur]
                }
                return acc
            }, {})
        }
    }
}
</script>

<style lang="scss">
    $bg: #fff;
    $light_gray: #fff;
    /* reset element-ui css */
    .login-container {
        .el-form-item__content{font-size: $font-f4-size;}
        .verifi{
            .el-input{width: 220px;}
        }
        .el-input {
            display: inline-block;
            height: 50px;
            width: 85%;
            input {
                @extend %yt-input;
                background: transparent;
                border: 0;
                -webkit-appearance: none;
                border-radius: 0;
                padding: 0 5px 0 15px;
                height: 48px;
                line-height: 48px;
                &:-webkit-autofill {
                    -webkit-text-fill-color: $font-black-color !important;
                }
            }
        }
        .el-form-item {
            @extend %yt-input;
            margin-bottom: 30px;
            height: 50px;
        }
        .el-form-item__error{
            color:$red;
            font-size: $font-f5-size;
            margin-top: 4px;
        }
    }
</style>

<style lang="scss" scoped>
    $bg: #2d3a4b;
    $dark_gray: #889aa4;
    $light_gray: #eee;
    .verifi{width: 300px;}
    .verifi-img{float: left;display: block;width: 120px;height: 50px;margin-left: 20px;cursor: pointer;}
    .input-focus{border-color: $blue-click;}
    .big-btn{margin-bottom: 30px;margin-top: 10px;}
    .login-container {
        background: url("~@imgs/login/bg-image.png") center center / 100% 100% no-repeat;
        text-align: center;
        min-height: 100%;
        width: 100%;
        overflow: hidden;
        position: relative;
        .login-form {
            position: absolute;
            width: 560px;
            height:460px;
            overflow: hidden;
            top:50%;
            left:50%;
            margin: -280px 0 0 -230px;
            background: #fff;
            border-radius: 8px;
        }
        .tips {
            font-size: 14px;
            color: #fff;
            margin-bottom: 10px;
            span {
                &:first-of-type {
                    margin-right: 16px;
                }
            }
        }

        .svg-container {
            padding: 5px 5px 5px 15px;
            color: $dark_gray;
            vertical-align: middle;
            width: 40px;
            font-size: 20px;
            display: inline-block;
        }

        .title-container {
            position: relative;
            height:90px;
            background: url("~@imgs/login/logins_limage.png") 0 0 / 100% 100% no-repeat;
            img{margin-top: 22px;}
        }
        .content-container{
            width: 440px;
            margin: 0 auto;
            padding: 30px 0 40px;
        }

        .show-pwd {
            position: absolute;
            right: 10px;
            top: 7px;
            font-size: 16px;
            color: $dark_gray;
            cursor: pointer;
            user-select: none;
        }
    }
</style>
