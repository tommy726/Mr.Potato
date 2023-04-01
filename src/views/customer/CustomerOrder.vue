<template>
  <div class="container my-4 my-md-8">
    <div class="row justify-content-center">
      <div class="col-xxl-5 col-lg-8 col-md-10 col">
        <CustomerStepper />
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import CustomerStepper from '@/components/customer/CustomerStepper.vue';

export default {
  name: 'CustomerOrder',
  components: {
    CustomerStepper,
  },
};
</script>
