<template>
  <div class="d-flex flex-column min-vh-100">
    <customerNavbar />
    <main class="flex-grow-1">
      <router-view />
    </main>
    <customerFooter />
  </div>
</template>

<script>
import customerNavbar from '@/components/customer/CustomerNavbar.vue';
import customerFooter from '@/components/customer/CustomerFooter.vue';

export default {
  name: 'CustomerIndex',
  components: {
    customerNavbar,
    customerFooter,
  },
};
</script>
