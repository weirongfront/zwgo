/** When your routing table is too long, you can split it into small modules**/

const router = [
    {
        path: '/user',
        component: () => import('@views/home/dashboard'),
        name: 'user',
        meta: {title: '用户管理', noCache: true},
        children:[
            {
                path: '/user/info',
                component: () => import('@views/user/info'),
                name: 'user-info',
                meta: {title: '用户信息', noCache: true},
                role:[0,1]
            },
            {
                path: '/user/updatepwd',
                component: () => import('@views/user/updatepwd'),
                name: 'user-updatepwd',
                meta: {title: '修改密码', noCache: true},
                role:[0,1]
            }
        ]
    }
];

export default router;
