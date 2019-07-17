export default {
	data(){
		return {
			app:document.querySelector('#app')
		};
	},
	mounted(){
		this.resize();
	},
	beforeMount() {
		window.addEventListener('resize', this.resize);
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.resize);
	},
	method:{
		resize(){}
	}
}
