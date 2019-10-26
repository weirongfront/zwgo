/** When your routing table is too long, you can split it into small modules**/

const router = [
    {
        path: '/user',
        component: () => import('@views/home/dashboard'),
        name: 'user',
        meta: {title: '个人中心', role:[0,1],icon:'el-icon-user-solid'},
        children:[
            {
                path: '/user/info',
                component: () => import('@views/user/info'),
                name: 'user-info',
                meta: {title: '个人信息', role:[0,1]}
            },
            {
                path: '/user/updatepwd',
                component: () => import('@views/user/updatepwd'),
                name: 'user-updatepwd',
                meta: {title: '修改密码', role:[0,1]}
            }
        ]
    }
];

export default router;
