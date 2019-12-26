/** When your routing table is too long, you can split it into small modules**/

const router = [
    {
        path: '/video',
        component: () => import('@views/layout/hmf'),
        name: 'video',
        meta: {title: '视频专区', role:[0],icon:'el-icon-s-platform'},
        redirect:'/video/list',
        children:[
            {
                path: '/video/list',
                component: () => import('@views/video/list'),
                name: 'video-list',
                meta: {title: '视频列表'}
            },
            {
                path: '/video/detail',
                component: () => import('@views/video/detail'),
                name: 'video-detail',
                meta: {title: '视频'}
            }
        ]
    }
];

export default router;
