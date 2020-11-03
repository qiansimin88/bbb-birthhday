import 'lib-flexible'
import '@/assets/css/normalize.css'
import '@/assets/css/base.css'
import Vue from 'vue'
import VueLazyload from '@xc/xc-vue-lazyload'
import 'dsbridge'
import { Button, Form, Field, Toast } from 'vant';

// 移动端调试工具eruda
if (/dev|daily|gray|8080/.test(location.origin)) {
	(function () { var script = document.createElement('script'); script.src="//cdn.jsdelivr.net/npm/eruda"; document.body.appendChild(script); script.onload = function () { eruda.init() } })();
}

Vue.use(Button);
Vue.use(Toast);
Vue.use(Field);



Vue.config.productionTip = false
Vue.use(VueLazyload, {
  loading: ''
})

export function render (rootComponent) {
  new Vue({
    render: h => h(rootComponent)
  }).$mount('#app')
}
