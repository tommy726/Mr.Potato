<template>
  <div class="page-banner">
    <div class="background-image"></div>
    <div class="banner-text text-center text-black">
      <h3 class="h1 mb-4">歡慶開幕<br />邀您一起吃得更健康</h3>
      <p class="underLine">
        結帳輸入優惠碼:
        <a @click.prevent="copyCouponCode(couponCode)" href="#" class="text-primary fw-bold">
          {{ couponCode }} </a
        >，享全品項5折優惠!
      </p>
      <button @click="copyCouponCode(couponCode)" type="button" class="btn btn-warning text-black">
        複製優惠碼
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageBanner',
  data() {
    return {
      couponCode: 'MrPotato',
    };
  },
  methods: {
    copyCouponCode(text) {
      navigator.clipboard.writeText(text).then(() => {
        this.$store.dispatch('alertModules/updateMessage', {
          message: '已複製優惠碼',
          status: true,
        });
      });
    },
  },
};
</script>
