/** When your routing table is too long, you can split it into small modules**/

const router = [
    {
        path: '/tools',
        component: () => import('@/views/layout/headermainfooter'),
        name: 'layout',
        meta: {title: '工具类'},
        children:[
            {
                path: '/tools/qrcode',
                component: () => import('@/views/views/qrcode'),
                name: 'qrcode',
                meta: {title: '二维码工具'}
            },
            {
                path: '/tools/notebook',
                component: () => import('@/views/views/notebook'),
                name: 'notebook',
                meta: {title: '记事本'}
            },
            {
                path: '/tools/tree',
                component: () => import('@/views/views/treemenu'),
                name: 'tree',
                meta: {title: '菜单配置'}
            }
        ]
    }
];

export default router;
