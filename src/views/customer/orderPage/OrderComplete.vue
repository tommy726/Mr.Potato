<template>
  <div class="text-center p-8">
    <h2 class="fs-1 mb-5 text-primary">訂單已完成</h2>
    <p class="fs-4 mb-5">Mr.Potato 感謝您的購買 <br />請留意手機訊息，餐點抵達時會以電話通知。</p>
    <span class="text-danger fs-6 mb-5 d-block"
      >為了您的健康，餐點建議當日食用完畢，如未食用完請務必存放於冷藏。</span
    >
    <router-link to="/" class="btn btn-outline-secondary">返回首頁</router-link>
    <router-link to="/product_list/all" class="btn btn-outline-primary white-text-btn ms-3"
      >繼續訂餐</router-link
    >
  </div>
</template>

<script>
export default {
  name: 'OrderComplete',
};
</script>
