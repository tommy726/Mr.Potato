<template>
  <div>
    <IsLoading :active="$store.state.isLoading">
      <div><img src="@/assets/images/loading.gif" alt="loading" /></div>
    </IsLoading>
    <AlertMessageVue />
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AlertMessageVue from './components/shared/AlertMessage.vue';

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
};
</script>
