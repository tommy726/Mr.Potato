<template>
  <div>
    <IsLoading :active="$store.state.isLoading">
      <div><img src="@/assets/images/loading.gif" alt="loading" /></div>
    </IsLoading>
    <AlertMessage />
    <RouterView />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AlertMessage from './components/shared/AlertMessage.vue';

export default {
  name: 'App',
  components: {
    AlertMessage,
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
