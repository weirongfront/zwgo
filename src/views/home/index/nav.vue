<template>
    <nav>
        <ul>
            <li><a href="/#/login">简介</a></li>
            <li><a href="/#/login">登录</a></li>
            <li><a href="/#/register">注册</a></li>
        </ul>
    </nav>
</template>
<script>
// @ is an alias to /src

export default {
    name: "index-nav",
    data() {
        return {}
    },
    methods: {
    },
    destroyed() {
    }
};
</script>
<style lang="scss" scoped>
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
</style>
