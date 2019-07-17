<template>
    <div>
        <el-scrollbar class="sidebar" wrap-class="scrollbar-wrapper" :style="{height:height}">
            <el-menu
                :default-active="activeMenu"
                :collapse="isCollapse"
                :background-color="variables.menuBg"
                :text-color="variables.menuText"
                :unique-opened="false"
                :active-text-color="variables.menuActiveText"
                :collapse-transition="false"
                mode="vertical"
            >
                <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import sidebarItem from './sidebar/sidebarItem.vue'
import variables from '@/assets/scss/yt-variables.scss'

export default {
	name:'app-sidebar',
    components: { sidebarItem },
    props:['height'],
    computed: {
	    permission_routes(){
	    	return [
			    {
				    path: '/',
				    redirect:'/home',
				    name: 'home',
				    meta: {title: '首页', noCache: true}
			    },
			    {
				    path: '/home',
				    name: 'home',
				    meta: {title: '首页', noCache: true},
				    children:[
					    {
						    path: 'systemList',
						    component: () => import('@/views/home/chooseSystem'),
						    name: 'systemList',
						    meta: {title: '选择系统1', noCache: true}
					    }
				    ]
			    },
			    {
				    path: '/choose-system',
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
			    }
		    ]
        },
        activeMenu() {
            const route = this.$route
            const { meta, path } = route
            // if set path, the sidebar will highlight the path you set
            if (meta.activeMenu) {
                return meta.activeMenu
            }
            return path
        },
        variables() {
            return variables
        },
        isCollapse() {
            return false
        }
    }
}
</script>
<style lang="scss">
    .sidebar .el-menu{border-right: 0;}
    .sidebar .el-scrollbar__wrap{overflow: hidden;}
</style>
<style lang="scss" scoped>
    .sidebar{width: $sidebarWidth+px;height: 100%;background: $menuBg;}
</style>
