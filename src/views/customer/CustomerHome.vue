<template>
  <div>
    <!-- banner -->
    <div class="banner">
      <div
        class="bg-cover banner-jumbotron"
        :style="{ backgroundImage: `url(${require('@/assets/images/banner-vegetable.jpg')})` }"
      >
        <div class="banner-text text-center">
          <h2 class="h1 mb-4">讓沙發馬鈴薯的您<br />躺著也能吃到美味健康的餐盒</h2>
          <a href="#content" class="btn btn-outline-potatoText"
            >Learn more<i class="bi bi-arrow-down-circle ms-2"></i
          ></a>
        </div>
      </div>
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
                <br />
              </p>
              <h4 class="text-primary fw-bold">不是您不夠努力，可能只是吃得不對而已!</h4>
              <p>我們提供了方便的訂購方式、新鮮的食材以及口感美味的食品，讓您的生活更加輕鬆。</p>
            </div>
            <router-link to="/product_list/all" tag="a" class="btn btn-primary text-white"
              >現在就開始改變
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
      <ul class="row justify-content-center ps-0 m-0">
        <li
          class="col-4 bg-cover"
          :style="{ backgroundImage: `url(${require('@/assets/images/salad.jpg')})` }"
        >
          <router-link to="product_list/vegetarian">純素主義</router-link>
        </li>
        <li
          class="col-4 bg-cover"
          :style="{ backgroundImage: `url(${require('@/assets/images/steak.jpg')})` }"
        >
          <router-link to="product_list/meat">原肉至上</router-link>
        </li>
        <li
          class="col-4 bg-cover"
          :style="{ backgroundImage: `url(${require('@/assets/images/salmon.jpg')})` }"
        >
          <router-link to="product_list/seafood">就愛海味</router-link>
        </li>
      </ul>
    </div>

    <!-- publicity -->
    <section class="container-fluid publicity bg-white text-center my-4 my-lg-8">
      <h4 class="display-6 my-3 my-md-5 text-primary">Why Mr.Potato</h4>
      <p class="mb-6">
        一個健康的身體，需要好的營養和養分。 <br />Mr. Potato
        提供的健康餐盒，能讓您不用擔心吃不到健康食物的困擾。
      </p>
      <span class="h2 mt-3 mt-lg-8">綠色健康</span>
      <p>
        Mr.Potato 是一個綠色健康的品牌。
        <br />我們重視食品的健康與環境的保護，所有產品都是在綠色環保原則下製作的。
      </p>
    </section>

    <!-- product items -->
    <div class="container my-5 my-xxl-8">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <ProductsItem :productData="randomProducts"></ProductsItem>
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
  methods: {
    ...mapActions('productsModules', ['getProducts']),
  },
  computed: {
    ...mapGetters('productsModules', ['randomProducts']),
  },
  created() {
    this.getProducts();
  },
};
</script>
