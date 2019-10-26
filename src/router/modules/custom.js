/** When your routing table is too long, you can split it into small modules**/

const router = [
    {
        path: '/custom',
        component: () => import('@views/home/dashboard'),
        name: 'custom',
        meta: {title: '用户管理', role:[0],icon:'el-icon-s-custom'},
        redirect:'/custom/list',
        children:[
            {
                path: '/custom/list',
                component: () => import('@views/user/list'),
                name: 'custom-list',
                meta: {title: '用户列表',role:[0]},
            }
        ]
    }
];

export default router;
