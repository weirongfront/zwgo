<template>
    <div class="lock">
        <p>当前时间：{{year}}-{{month}}-{{day}} {{hour}}:{{minutes}}:{{second}}</p>
        <div class="time-panel year">{{toChar(year)+'年'}}</div>
        <ul :style="{transform:'rotateZ('+monthRotate+'deg)'}" class="time-panel month">
            <li v-for="num in 12" :key="num" :class="{active:month === 12 - num}" :style="{transform:'rotateZ('+(monthFullRotate/12*num)+'deg)'}">{{toChinese(12 - (num-1))+'月'}}</li>
        </ul>
        <ul :style="{transform:'rotateZ('+dayRotate+'deg)'}" class="time-panel day">
            <li v-for="num in monthDays" :key="num" :class="{active:day === monthDays - num}" :style="{transform:'rotateZ('+(dayFullRotate/monthDays*num)+'deg)'}">{{toChinese(monthDays - num)+'日'}}</li>
        </ul>
        <ul :style="{transform:'rotateZ('+hourRotate+'deg)'}" class="time-panel hour">
            <li v-for="num in 24" :key="num" :class="{active:hour === 24 - num}" :style="{transform:'rotateZ('+(hourFullRotate/24*num)+'deg)'}">{{toChinese(24 - num)+'时'}}</li>
        </ul>
        <ul :style="{transform:'rotateZ('+minutesRotate+'deg)'}" class="time-panel minutes">
            <li v-for="num in 60" :key="num" :class="{active:minutes === 60 - num}" :style="{transform:'rotateZ('+(minutesFullRotate/60*num)+'deg)'}">{{toChinese(60 - num)+'分'}}</li>
        </ul>
        <ul :style="{transform:'rotateZ('+secondRotate+'deg)'}" class="time-panel second">
            <li v-for="num in 60" :key="num" :class="{active:second === 60 - num}" :style="{transform:'rotateZ('+(secondFullRotate/60*num)+'deg)'}">{{toChinese(60 - num)+'秒'}}</li>
        </ul>
    </div>
</template>
<script>
// @ is an alias to /src

import {toChar, toChinese} from "../../utils/number";

export default {
    name: "case-lock",
    data() {
        let time = new Date();
        return {
            year:time.getFullYear(),
            month:time.getMonth(),
            monthDays:new Date(time.getFullYear(), time.getMonth() + 1, 0).getDate(),
            day:time.getDate(),
            hour:time.getHours(),
            minutes:time.getMinutes(),
            second:time.getSeconds(),
            monthRotate:0,
            dayRotate:0,
            hourRotate:0,
            minutesRotate:0,
            secondRotate:0,
            yearFullRotate:360,
            monthFullRotate:0,
            dayFullRotate:0,
            hourFullRotate:0,
            minutesFullRotate:0,
            secondFullRotate:0
        }
    },
    mounted(){
        setTimeout(()=>{
            this.fullRotate()
        },500);
    },
    methods:{
        toChinese(val){
            return toChinese(val);
        },
        toChar(val){
            return toChar(val);
        },
        fullRotate(){
            this.countUp(360,_=>{
                this.monthFullRotate = _;
            },()=>{
                this.countUp(360,_=>{
                    this.dayFullRotate = _;
                },()=>{
                    this.countUp(360,_=>{
                        this.hourFullRotate = _;
                    },()=>{
                        this.countUp(360,_=>{
                            this.minutesFullRotate = _;
                        },()=>{
                            this.countUp(360,_=>{
                                this.secondFullRotate = _;
                            },()=>{
                                this.interval();
                            });
                        });
                    });
                });
            });
        },
        interval(){
            setInterval(()=>{
                let time = new Date();
                this.year = time.getFullYear();
                this.month = time.getMonth();
                this.day = time.getDate();
                this.hour = time.getHours();
                this.minutes = time.getMinutes();
                this.second = time.getSeconds();
                this.monthRotate = 360/12*this.month;
                this.dayRotate = 360/this.monthDays*this.day;
                this.hourRotate = 360/24*this.hour;
                this.minutesRotate = 360/60*this.minutes;
                this.secondRotate = 360/60*this.second+this.minutes*360;
            },1000);
        },
        countUp(count,stepcallback,callback){
            let u = 0;
            let downTimer = setInterval(()=>{
                u+=25;
                if(count <= u){
                    stepcallback(count);
                    clearInterval(downTimer);
                    callback && callback();
                }else{
                    stepcallback(u);
                }
            },40);
        }
    }
};
</script>
<style lang="scss" scoped>
    $width:800;
    .lock{
        display: block;width: $width+px;height: 800px;position: relative;margin: 0 auto;font-size: 14px;
        .time-panel{
            display: block;position: absolute;top:50%;left: 50%;transform-origin:0 10px;transition:all 0.3s ease;
            li{
                text-align: right;position: absolute;top:0;left:0;width: 100%;transform-origin:0 10px;height: 20px;
                &.active{font-weight: bold;font-size: 16px;color: #f5ec74;}
            }
        }
        .year{width: 100px;margin-left: -50px;text-align: center;color:#f5ec74;height: 20px;line-height: 20px;}
        .month{width: $width/2-305+px;}
        .day{width: $width/2-230+px;}
        .hour{width: $width/2-170+px;}
        .minutes{width:$width/2-95+px;}
        .second{width:$width/2-20+px;}
    }

</style>
