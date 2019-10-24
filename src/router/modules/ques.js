/** When your routing table is too long, you can split it into small modules**/

const router = [
    {
        path: '/ques',
        component: () => import('@views/home/dashboard'),
        name: 'ques',
        meta: {title: '问卷管理', noCache: true},
        redirect:'/ques/list',
        children:[
            {
                path: '/ques/list',
                component: () => import('@views/ques/list'),
                name: 'ques-list',
                meta: {title: '问卷列表', noCache: true}
            },
            {
                path: '/ques/add',
                component: () => import('@views/ques/add'),
                name: 'ques-add',
                meta: {title: '新增问卷', noCache: true}
            },
            {
                path: '/ques/statistics',
                component: () => import('@views/ques/statistics'),
                name: 'ques-statistics',
                meta: {title: '答案统计列表', noCache: true}
            }
        ]
    }
];

export default router;
