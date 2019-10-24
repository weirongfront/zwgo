import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist' // vuex持久化插件

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage
});

// 动态加载
const modulesFiles = require.context('./modules', true, /\.js$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});
const store = new Vuex.Store({
  modules,
  plugins: [vuexLocal.plugin]
});

export default store;
