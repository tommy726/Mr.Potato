<template>
  <div class="stepper-wrapper">
    <div
      :class="{ active: path === '/check_cart', completed: path !== '/check_cart' }"
      class="stepper-item"
    >
      <div class="step-counter">1</div>
      <div class="step-name">確認購物車</div>
    </div>
    <div
      :class="{
        active: path === '/customer_info',
        completed: path.includes('/checkouts') || path === '/order_complete',
      }"
      class="stepper-item"
    >
      <div class="step-counter">2</div>
      <div class="step-name">填寫資料</div>
    </div>
    <div
      :class="{ active: path.includes('/checkouts'), completed: path === '/order_complete' }"
      class="stepper-item"
    >
      <div class="step-counter">3</div>
      <div class="step-name">確認付款</div>
    </div>
    <div
      :class="{ active: path === '/order_complete', completed: path === '/order_complete' }"
      class="stepper-item"
    >
      <div class="step-counter">4</div>
      <div class="step-name">訂單完成</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomerStepper',
  computed: {
    path() {
      return this.$route.path;
    },
  },
};
</script>
