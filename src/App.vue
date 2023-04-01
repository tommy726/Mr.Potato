<template>
  <div>
    <isLoading :active="$store.state.isLoading" />
    <AlertMessageVue />
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AlertMessageVue from './components/shared/AlertMessage.vue';
import router from './router';

export default {
  name: 'App',
  components: {
    AlertMessageVue,
  },
  computed: {
    ...mapGetters(['isLoading']),
  },
  created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = `${token}`;
  },
  watch: {
    $route(to) {
      if (to.path === '/admin') {
        router.push('/admin/products');
      }
    },
  },
};
</script>
