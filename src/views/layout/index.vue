<template>
    <div class="body">
        <zw-header></zw-header>
        <div class="zw-body" :style="{minHeight: this.height}">
            <index-carousel></index-carousel>
            <p class="title-font">{{title}}官网</p>
            <nav>
                <ul>
                    <li><a href="/#/login">简介</a></li>
                    <li><a href="/#/login">登录</a></li>
                    <li><a href="/#/register">注册</a></li>
                </ul>
            </nav>
        </div>
        <zw-footer></zw-footer>
    </div>
</template>
<script>
// @ is an alias to /src
import ZwHeader from "./zw-header";
import ZwFooter from "./zw-footer";
import IndexCarousel from "./index/carousel";
import {title} from '@/config';

export default {
    name: "dashboard",
    components: {IndexCarousel, ZwFooter, ZwHeader},
    data() {
        return {
            height:(window.innerHeight - 60 - 80)+'px',
            title:title
        }
    },
    computed:{
        key() {
            return this.$route.path
        }
    },
    mounted() {
        window.addEventListener('resize',this.resize);
    },
    methods: {
        resize(){
            this.height = Math.max(window.innerHeight - 60 - 80,460)+'px';
        }
    },
    destroyed() {
        window.removeEventListener('resize',this.resize);
    }
};
</script>
<style lang="scss" scoped>
    .body{background: #2d3a4b;}
    .zw-body{
        padding:20px;background: rgba(0,0,0,.3);width: 1190px;margin: 0 auto;box-shadow:0 5px 5px 5px #2d3a4b;
        .title-font{font-size: 30px;font-weight: bold;color: #fff;text-align: center;margin-top: 20px;}
        nav ul {
            display: -moz-flex;width: 22.5rem;margin: 20px auto 0;
            display: -webkit-flex;
            display: -ms-flex;
            display: flex;
            list-style: none;
            padding-left: 0;
            border: solid 1px #ffffff;
            border-radius: 4px;
            li {
                padding-left: 0;
                border-left: solid 1px #ffffff;text-align: center;
                &:first-child {
                    border-left: 0;
                }
                a {
                    display: block;color:#fff;
                    min-width: 7.5rem;
                    height: 2.75rem;
                    line-height: 2.75rem;
                    padding: 0 1.25rem 0 1.45rem;
                    text-transform: uppercase;
                    letter-spacing: 0.2rem;
                    font-size: 0.8rem;
                    border-bottom: 0;
                    &:hover {
                        background-color: rgba(255, 255, 255, 0.075);
                    }
                    &:active {
                        background-color: rgba(255, 255, 255, 0.175);
                    }
                }
            }
        }
    }
</style>
