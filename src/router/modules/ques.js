/** When your routing table is too long, you can split it into small modules**/

const router = [
    {
        path: '/ques',
        component: () => import('@views/home/dashboard'),
        name: 'ques',
        meta: {title: '问卷管理', icon:'el-icon-document'},
        redirect:'/ques/list',
        children:[
            {
                path: '/ques/list',
                component: () => import('@views/ques/list'),
                name: 'ques-list',
                meta: {title: '问卷列表', role:[0]}
            },
            {
                path: '/ques/mylist',
                component: () => import('@views/ques/mylist'),
                name: 'ques-mylist',
                meta: {title: '我的问卷列表', role:[0,1]}
            },
            {
                path: '/ques/add',
                component: () => import('@views/ques/add'),
                name: 'ques-add',
                meta: {title: '新增问卷', role:[0,1]}
            },
            {
                path: '/ques/statistics',
                component: () => import('@views/ques/statistics'),
                name: 'ques-statistics',
                meta: {title: '答案统计列表', noCache: true,menu:false}
            }
        ]
    }
];

export default router;
