/** When your routing table is too long, you can split it into small modules**/

import headerMain from '@/views/layout/headerMain.vue';

const router = [{
	path: '/aaa',
	component: headerMain,
	name: 'home',
	meta: {title: '首页', noCache: true}
}, {
	path: '/choose-system',
	component: headerMain,
	redirect: '/choose-system/systemList',
	name: 'stystems',
	children: [
		{
			path: 'systemList',
			component: () => import('@/views/home/chooseSystem'),
			name: 'systemList',
			meta: {title: '选择系统', noCache: true}
		},
	]
}];

export default router;
