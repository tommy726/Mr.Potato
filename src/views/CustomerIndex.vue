<template>
  <div class="d-flex flex-column min-vh-100">
    <CustomerNavbar />
    <main class="flex-grow-1">
      <router-view />
    </main>
    <CustomerFooter />
  </div>
</template>

<script>
import CustomerNavbar from '@/components/customer/CustomerNavbar.vue';
import CustomerFooter from '@/components/customer/CustomerFooter.vue';

export default {
  name: 'CustomerIndex',
  components: {
    CustomerNavbar,
    CustomerFooter,
  },
};
</script>
