import '@/assets/stylesheet/main.scss';
import '@fortawesome/fontawesome-free/css/all.css';
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
import {
  configure, defineRule, Field, Form,
} from 'vee-validate';
import AllRules from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';
import VueAxios from 'vue-axios';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { createApp } from 'vue';
import App from './App.vue';
import currencyFilter from './filters/currency';
import dateFilter from './filters/date';
import router from './router';
import store from './store';

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});

configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true,
});
setLocale('zh_TW');

const app = createApp(App);

app.config.globalProperties.$filters = {
  currency: currencyFilter,
  date: dateFilter,
};

app.component('IsLoading', Loading)
  .component('Form', Form)
  .component('Field', Field)
  .use(store)
  .use(router)
  .use(VueAxios, axios)
  .mount('#app');

axios.defaults.withCredentials = true;
AOS.init();
