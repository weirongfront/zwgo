<template>
    <div class="questionnaire-panel" v-if="questionnaire">
        <h2 class="questionnaire-title">{{questionnaire.title}}</h2>
        <p class="questionnaire-sub-title">作者：{{questionnaire.user_name}} | 时间：{{questionnaire.createtime}}</p>
        <ul class="ques-list">
            <li v-for="(ques,index) in questionnaire.quesList" :key="ques.Id" :class="{mt20:index!==0}">
                <p class="ques-title">
                    {{(index+1)+'、'+ques.title}}
                </p>
                <div class="ques-option">
                    <el-radio-group v-if="ques.type === 1" class="full-option" v-model="answer[ques.Id+'']">
                        <el-radio border v-for="(option) in ques.options" :label="option.index" :key="option.Id">{{option.title}}</el-radio>
                    </el-radio-group>
                    <el-checkbox-group v-else-if="ques.type === 2" class="full-option" v-model="answer[ques.Id+'']">
                        <el-checkbox border v-for="(option) in ques.options" :label="option.index" :key="option.Id">{{option.title}}</el-checkbox>
                    </el-checkbox-group>
                    <el-input style="margin: 10px 0;" v-else-if="ques.type === 3" v-model="answer[ques.Id+'']"></el-input>
                    <el-input style="margin: 10px 0;" v-else-if="ques.type === 4" v-model="answer[ques.Id+'']" type="textarea"></el-input>
                </div>
            </li>
        </ul>
        <el-button class="questionnaire-submit" type="primary" @click="saveAnswer">提  交</el-button>
    </div>
</template>
<script>
// @ is an alias to /src
import {getById, saveAnswer} from "../../data/modules/ques";
import {parseTime} from "../../utils";

export default {
    name: "questionnaire",
    data() {
        return {
            quesId:this.$route.query.id,
            questionnaire:null,
            answer:null
        };
    },
    mounted() {
        this.getQuesById();
    },
    methods: {
        getQuesById(){
            const loading = this.$loading({
                lock: true,
                text: '数据加载中',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.6)'
            });
            getById({
                id:this.quesId
            }).then(res => {
                loading.close();
                if(res.status === 0){
                    let answer = {};
                    res.data.quesList.map(ques=>{
                        answer[ques.Id] = ques.type === 2?[]:null;
                    });
                    res.data.createtime = parseTime(res.data.createtime,'{y}-{m}-{d}');
                    this.answer = answer;
                    this.questionnaire = res.data;
                }
            }).catch(() => {
                loading.close();
            });
        },
        // 保存答题记录
        saveAnswer(){
            let pass = true,answers={};
            Object.keys(this.answer).map((key)=>{
                let item = this.answer[key];
                if(item === null || (item.length && item.length === 0)){
                    pass = false;
                }else if(item.length && typeof item !== 'string'){
                    answers[key] = item.join(',');
                }else{
                    answers[key] = item;
                }
            });
            if(pass === false){
                this.$alert('您有未答的题目，请检查答题','提示');
                return pass;
            }
            const loading = this.$loading({
                lock: true,
                text: '请求提交中',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.6)'
            });
            saveAnswer({
                questionnaireId:this.quesId,
                answers
            }).then(res => {
                loading.close();
                this.$alert('提交成功,点击确定查看报告','提示', {
                    confirmButtonText: '确定',
                    callback: () => {
                        this.$router.push({path:'/report',query:{id:res.id}});
                    }
                });
            }).catch(() => {
                loading.close();
            });
        }
    }
};
</script>
<style lang="scss" scoped>
    .questionnaire-panel{
        width: 960px;background: #fff;margin:0 auto;padding: 30px;color: #333;
        .questionnaire-title{font-size: 20px;text-align: center;}
        .questionnaire-sub-title{font-size: 14px;color: #999;text-align: right;line-height: 20px;padding: 8px 0;}
        .questionnaire-submit{width: 80%;margin: 30px auto 0;display: block;}
    }
    @media screen and (max-width: 760px) {
        .questionnaire-panel{
            width: 100%;padding: 1rem 1rem 2rem;
            .questionnaire-title{font-size: 1.2rem;}
            .questionnaire-sub-title{font-size: .9rem;line-height: 1.5rem;padding: 1rem 0;}
            .ques-list{
                .ques-title{font-size: 1rem;}
            }
        }
    }
</style>
