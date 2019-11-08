<template>
    <div class="questionnaire-panel" v-if="questionnaire">
        <h1 class="report-title">问卷作答报告</h1>
        <h2 class="questionnaire-label mt40">问卷名称：<span class="c6">{{questionnaire.title}}</span></h2>
        <h2 class="questionnaire-label">提交时间：<span class="c6">{{questionnaire.createtime}}</span></h2>
        <h2 class="questionnaire-label">作答详情：</h2>
        <ul class="ques-list mt20">
            <li v-for="(ques,index) in questionnaire.quesList" :key="ques.Id" :class="{mt20:index!==0}">
                <p class="ques-title">
                    {{(index+1)+'、'+ques.title}}
                </p>
                <template v-if="ques.type === 1">
                    <p class="ques-answer">
                        答案：{{ques.options[parseInt(ques.answer)].title}}
                    </p>
                    <p class="ques-answer">
                        作答：{{ques.options[parseInt(ques.userAnswer)].title}}
                    </p>
                </template>
                <template v-else-if="ques.type === 2">
                    <div class="clearfix ques-answer">
                        <p class="fl">
                            答案：
                        </p>
                        <div class="fl">
                            <span v-for="(answer,aindex) in ques.answer.split(',')" :key="aindex">{{(parseInt(answer)+1)+'、'+ques.options[parseInt(answer)].title}}<br/></span>
                        </div>
                    </div>
                    <div class="clearfix ques-answer">
                        <p class="fl">
                            作答：
                        </p>
                        <div class="fl">
                            <span v-for="(answer,aindex) in ques.userAnswer.split(',')" :key="aindex">{{(parseInt(answer)+1)+'、'+ques.options[parseInt(answer)].title}}<br/></span>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <p class="ques-answer" v-if="ques.answer">
                        答案：{{ques.answer}}
                    </p>
                    <p class="ques-answer">
                        作答：{{ques.userAnswer}}
                    </p>
                </template>
            </li>
        </ul>
    </div>
</template>
<script>
// @ is an alias to /src
import {getReportById} from "../../data/modules/ques";
import {parseTime} from "../../utils";

export default {
    name: "questionnaire",
    data() {
        return {
            answerId:this.$route.query.id,
            questionnaire:null
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
            getReportById({
                id:this.answerId
            }).then(res => {
                loading.close();
                if(res.status === 0){
                    res.data.createtime = parseTime(res.data.createtime);
                    this.questionnaire = res.data;
                }
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
        .report-title{text-align: center;font-size: 24px;}
        .questionnaire-label{font-size: 16px;text-align: left;margin-top: 15px;}
        .questionnaire-submit{width: 80%;margin: 30px auto 0;display: block;}
        .ques-list{
            color:#666;border: 1px solid #999;padding: 20px;border-radius: 8px;
            .ques-title{}
            .ques-answer{font-size: 14px;margin-top: 10px;}
        }
    }
    @media screen and (max-width: 760px) {
        .questionnaire-panel{
            width: 100%;padding: 1rem 1rem 2rem;
            .mt40{margin-top: 1rem!important;}
            .questionnaire-label{font-size: 1rem;margin-top: .4rem;}
            .questionnaire-sub-title{font-size: .9rem;line-height: 1.5rem;padding: 1rem 0;}
            .ques-list{
                .ques-title{font-size: 1rem;}
            }
        }
    }
</style>
