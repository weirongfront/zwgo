/*
 * @Author: Amanda
 * @Date: 2019-07-16 15:24:47
 * @Last Modified by:   Amanda
 * @Last Modified time: 2019-07-16 15:24:47
 *@Remark:  用户-个人中心路由配置文件 */

import headerCrumbsMain from '@/views/layout/headerCrumbsMain.vue';
const router = {
    path: '/userMain',
    component: headerCrumbsMain,
    name: 'userMain',
    meta: {title: '个人中心'},
    children:[{
        path:'',
        component: ()=>import('@/views/user/userMain.vue'),
    }]
};

export default router;
