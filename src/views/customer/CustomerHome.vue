<template>
  <div>
    <!-- banner -->
    <div class="home-banner position-relative px-3">
      <div class="background-image"></div>
      <div class="banner-text text-center text-black">
        <h2 class="h1 mb-4">讓沙發馬鈴薯的您<br />躺著也能吃到美味健康的餐盒</h2>
      </div>
      <a href="#content" aria-label="go Content" class="arrow fs-1 p-8">
        <i class="fa-solid fa-angles-down p-8"></i>
      </a>
    </div>

    <!-- product concept -->
    <section class="bg-white py-4 py-lg-8" id="content">
      <div class="container">
        <div class="row g-3 justify-content-center py-8">
          <div class="col-lg-6">
            <h3 class="h2">忙碌的生活中， <br />Mr.Potato是您健康餐飲的首選。</h3>
            <div class="text-secondary">
              <p>
                您也是每天早早起床，晚晚到家嗎？
                <br />下班拖著疲累的身軀，還是堅持踏進了健身房，但回家後總是吃著隨便買的速食、滷味、鹹酥雞？
                <br />明明已經騰出時間去運動，身材的變化卻總是不如預期嗎？
              </p>
              <h4 class="text-primary fw-bold">不是您不夠努力，可能只是吃得不對而已!</h4>
              <p>我們提供了方便的訂購方式、新鮮的食材以及口感美味的食品，讓您的生活更加輕鬆。</p>
            </div>
            <router-link
              to="/product_list/all"
              tag="a"
              class="btn btn-primary text-white"
              data-aos="flip-up"
              data-aos-duration="800"
              >
              現在就開始改變
            </router-link>
          </div>
          <div class="col-lg-4 d-lg-block d-none figure">
            <img
              class="figure-img rounded img-fluid"
              src="@/assets/images/potato.jpg"
              alt="potato"
            />
            <figcaption class="figure-caption text-end">
              嚴選每日新鮮食材，讓您吃得安心。
            </figcaption>
          </div>
        </div>
      </div>
    </section>

    <!-- menu-list -->
    <div class="container-fluid menu-list py-4 py-md-8 my-4 my-lg-8">
      <div
        class="text-center mb-6 underLine"
        data-aos="fade-down"
        data-aos-delay="200"
        data-aos-duration="600"
      >
        <h3 class="h1 mb-3">Mr.Potato 開幕慶，邀請您一起體驗新鮮!</h3>
        <p class="h4 mb-3">
          結帳輸入
          <a @click.prevent="copyCouponCode(couponCode)" href="#" class="text-primary fw-bold">
            {{ couponCode }}
          </a>
          ，享全品項5折優惠
        </p>
        <ins class="h4 mt-3">立即點選下方圖示挑選美食</ins>
      </div>
      <ul
        class="row justify-content-center ps-0 m-0"
        data-aos="fade-up"
        data-aos-delay="300"
        data-aos-duration="800"
      >
        <li class="col-4 bg-cover vegetable">
          <router-link to="product_list/vegetarian">純素主義</router-link>
        </li>
        <li class="col-4 bg-cover meat">
          <router-link to="product_list/meat">原肉至上</router-link>
        </li>
        <li class="col-4 bg-cover seafood">
          <router-link to="product_list/seafood">就愛海味</router-link>
        </li>
      </ul>
    </div>

    <!-- publicity -->
    <section class="publicity bg-white text-center my-4 my-lg-8">
      <div class="container">
        <h4 class="display-6 my-3 my-md-5 text-primary">Why Mr.Potato</h4>
        <p class="mb-6">
          一個健康的身體，需要好的營養和養分。
          <br />Mr. Potato
          提供的健康餐盒，能讓您不用擔心吃不到健康食物的困擾。
        </p>
        <h5 class="h2 mt-3 mt-lg-8 mb-5 text-success">綠色健康</h5>
        <p>
          Mr.Potato 是一個綠色健康的品牌。
          <br />我們重視食品的健康與環境的保護，所有產品都是在綠色環保原則下製作的。
        </p>
        <h6 class="h2 mt-3 mt-lg-8 mb-5 text-primary">品味，源自於對細節的追求</h6>
        <p>每一道菜色都經過嚴格挑選，烹調出精湛的口味和質感，讓您享受到高品質的健康餐食！</p>
      </div>
    </section>

    <!-- product items -->
    <div class="container py-4 my-5 my-lg-8">
      <div class="row justify-content-center">
        <div
          class="col-md-8 my-4"
          data-aos="fade-zoom-in"
          data-aos-offset="0"
          data-aos-duration="800"
          data-aos-anchor-placement="top-center"
        >
          <h2 class="text-center h1 mb-6">熱門商品</h2>
          <ProductsItem :productData="lunchBoxProducts" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ProductsItem from '@/components/customer/ProductsItem.vue';

export default {
  name: 'CustomerHome',
  components: {
    ProductsItem,
  },
  data() {
    return {
      couponCode: 'MrPotato',
    };
  },
  methods: {
    ...mapActions('productsModules', ['getProducts']),
    copyCouponCode(text) {
      const vm = this;
      navigator.clipboard.writeText(text).then(() => {
        vm.$store.dispatch('alertModules/updateMessage', {
          message: '已複製優惠碼',
          status: true,
        });
      });
    },
  },
  computed: {
    ...mapGetters('productsModules', ['lunchBoxProducts']),
  },
  created() {
    this.getProducts();
  },
};
</script>
