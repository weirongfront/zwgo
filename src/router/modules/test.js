/** When your routing table is too long, you can split it into small modules**/

import headerMain from '@/views/layout/headerMain.vue';
import headerLeftMain from '@/views/layout/headerLeftMain.vue';
import headerCrumbsMain from '@/views/layout/headerCrumbsMain.vue';
import headerLeftTreebarMain from '@/views/layout/headerLeftTreebarMain.vue';
import headerLeftCrumbsMain from '@/views/layout/headerLeftCrumbsMain.vue';

const router = [
	{
		path: '/headerMain',
		component: headerMain,
		name: 'home',
		meta: {title: '首页', noCache: true},
		children: [
			{
				path: '',
				component: () => import('@/views/home/chooseSystem'),
				name: 'systemList',
				meta: {title: '选择系统', noCache: true}
			}
		]
	},
	{
		path: '/headerLeftCrumbsMain',
		component: headerLeftCrumbsMain,
		name: 'home',
		meta: {title: '首页', noCache: true},
		children: [
			{
				path: '',
				component: () => import('@/views/home/chooseSystem'),
				name: 'systemList',
				meta: {title: '选择系统', noCache: true}
			}
		]
	},
	{
		path: '/headerLeftMain',
		component: headerLeftMain,
		name: 'stystems',
		children: [
			{
				path: '',
				component: () => import('@/views/home/chooseSystem'),
				name: 'systemList',
				meta: {title: '选择系统', noCache: true}
			},
		]
	},
	{
		path: '/headerCrumbsMain',
		component: headerCrumbsMain,
		name: 'stystems',
		children: [
			{
				path: '',
				component: () => import('@/views/home/chooseSystem'),
				name: 'systemList',
				meta: {title: '选择系统', noCache: true}
			},
		]
	},
	{
		path: '/headerLeftTreebarMain',
		component: headerLeftTreebarMain,
		name: 'stystems',
		children: [
			{
				path: '',
				component: () => import('@/views/home/chooseSystem'),
				name: 'systemList',
				meta: {title: '选择系统', noCache: true}
			},
		]
	}
];

export default router;
