<template>
  <div class="d-flex flex-column min-vh-100">
    <DashboardNavbar @sign-out="signOut" />
    <div class="flex-grow-1 bg-white">
      <div class="d-flex flex-nowrap">
        <DashboardSidebar @sign-out="signOut" />
        <main class="container py-4 py-md-8">
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardSidebar from '@/components/dashboard/DashboardSidebar.vue';
import DashboardNavbar from '@/components/dashboard/DashboardNavbar.vue';

export default {
  name: 'AdminDashboard',
  components: {
    DashboardNavbar,
    DashboardSidebar,
  },
  methods: {
    signOut() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/logout`;
      vm.$http.post(api)
        .then((response) => {
          if (response.data.success) {
            vm.$router.push('/');
          }
        })
        .catch(() => {
          vm.$store.dispatch('alertModules/updateMessage', {
            message: '請確認api是否正確',
            status: false,
          });
        });
    },
  },
};
</script>
