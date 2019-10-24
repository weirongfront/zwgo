/** When your routing table is too long, you can split it into small modules**/

const router = [
    {
        path: '/user',
        component: () => import('@views/home/dashboard'),
        name: 'user',
        meta: {title: '用户管理', noCache: true},
        redirect:'/user/list',
        children:[
            {
                path: '/user/list',
                component: () => import('@views/user/list'),
                name: 'user-list',
                meta: {title: '用户列表', noCache: true}
            },
            {
                path: '/user/info',
                component: () => import('@views/user/info'),
                name: 'user-info',
                meta: {title: '用户信息', noCache: true}
            },
            {
                path: '/user/updatepwd',
                component: () => import('@views/user/updatepwd'),
                name: 'user-updatepwd',
                meta: {title: '修改密码', noCache: true}
            }
        ]
    }
];

export default router;
