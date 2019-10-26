import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store/index'
import {Message} from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {getToken,hasRoles} from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

Vue.use(Router);

// 所有路由数组
const routes = [];
// 动态加载路由
const modulesFiles = require.context('./modules', true, /\.js$/);
modulesFiles.keys().map((modulePath) => {
    const value = modulesFiles(modulePath);
    //判断是否为数组路由
    if (value.default.length || value.default.length === 0) {
        routes.push(...value.default);
    } else {
        routes.push(value.default);
    }
});

const createRouter = () => new Router({
    routes
});

const router = createRouter();

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

NProgress.configure({showSpinner: false}) // NProgress Configuration

router.beforeEach(async (to, from, next) => {
    // start progress bar
    NProgress.start();
    // set page title
    document.title = getPageTitle(to.meta.title);
    // determine whether the user has logged in
    const hasToken = getToken(),
        userRole = store.getters['user/roles'],
        hasRole = hasRoles(to.meta.role,userRole);
    if (hasRole) {
        next();
    } else {
        if (hasToken) {
            Message.error('此账号无权限');
        } else {
            next(`/login?redirect=${to.path}`);
        }
    }
    NProgress.done();
});

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
});

//export default router
export default router;