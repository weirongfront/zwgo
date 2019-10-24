'use strict'
const path = require('path')
function resolve(dir) {
	return path.join(__dirname, dir);
}
module.exports = {
	publicPath: './',
	outputDir: 'dist',
	assetsDir: 'static',
	lintOnSave: process.env.NODE_ENV === 'development',
	productionSourceMap: false,
	configureWebpack: {
		resolve: {
			alias: {
				'@': resolve('src'),
				'@scss': resolve('src/assets/scss'),
				'@imgs': resolve('src/assets/imgs'),
				'@comp': resolve('src/components'),
				'@views': resolve('src/views')
			}
		}
	},
	chainWebpack(config) {
		// set svg-sprite-loader
		config.module
			.rule('svg')
			.exclude.add(resolve('src/assets/icons/svg'))
			.end();
		config.module
			.rule('icons')
			.test(/\.svg$/)
			.include.add(resolve('src/assets/icons/svg'))
			.end()
			.use('svg-sprite-loader')
			.loader('svg-sprite-loader')
			.options({
				symbolId: 'icon-[name]'
			})
			.end();
		config.module
			.rule('vue')
			.use('vue-loader')
			.loader('vue-loader')
			.tap(options => {
				options.compilerOptions.preserveWhitespace = true
				return options;
			})
			.end();

		config
			.when(process.env.NODE_ENV === 'development',
				config => config.devtool('cheap-source-map')
			);
	},
	css: {
		loaderOptions: {
			sass: {
				// 根据自己样式文件的位置调整
				data: `@import "@/assets/scss/yt-variables.scss";`
			}
		}
	}
}
