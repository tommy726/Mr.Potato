<template>
  <footer class="customer-footer bg-white py-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-8">
          <div class="row g-0">
            <div class="col-md-6">
              <div class="info mb-3">
                <router-link to="/" tag="a" class="h3">
                  <img
                    src="@/assets/images/logo.png"
                    alt=""
                    width="28"
                    height="28"
                    class="d-inline-block align-text-top"
                  />
                  Mr.Potato
                </router-link>
                <a href="https://goo.gl/maps/ZpDuTXDgAZu9doX88" target="_blank"
                  >台北市信義區市府路45號</a
                >
                <div>
                  <a href="tel:+886 987654321" class="info-border">0987654321</a>
                  <a href="mailto:MrPotato@google.com">MrPotato@google.com</a>
                </div>
              </div>
            </div>
            <div class="col-md-6 text-center mt-auto">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14459.994326708158!2d121.55794255797353!3d25.034122200000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abb6da80a7ad%3A0xacc4d11dc963103c!2z5Y-w5YyXMTAx6LO854mp5Lit5b-D!5e0!3m2!1szh-TW!2stw!4v1677431686428!5m2!1szh-TW!2stw"
                title="Google Map"
                allowfullscreen="true"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="row my-3">
            <div class="col-3">
              <ul class="social-link p-0 fs-5">
                <li>
                  <a href="https://zh-tw.facebook.com/" target="_blank" aria-label="Go to FB"
                    ><i class="fa-brands fa-facebook"></i
                  ></a>
                </li>
                <li>
                  <a href="https://www.instagram.com/" target="_blank" aria-label="Go to IG"
                    ><i class="fa-brands fa-instagram"></i
                  ></a>
                </li>
                <li>
                  <a href="https://line.me/zh-hant/" target="_blank" aria-label="Go to Line"
                    ><i class="fa-brands fa-line"></i
                  ></a>
                </li>
              </ul>
            </div>
            <div class="col-9">
              <div class="input-group">
                <input
                  v-model="email"
                  type="text"
                  class="form-control"
                  placeholder="請輸入 Email"
                  aria-label="subscribeEmail"
                  aria-describedby="subscribeEmail"
                />
                <button
                  @click="subscription"
                  type="button"
                  class="btn input-group-text btn-primary text-white"
                >
                  訂閱
                </button>
              </div>
            </div>
          </div>
          <span class="d-block text-end">圖片均來自網路，純屬個人作業，無商業行為。</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'CustomerFooter',
  data() {
    return {
      email: '',
    };
  },
  methods: {
    subscription() {
      this.email = '感謝訂閱';
    },
  },
};
</script>
