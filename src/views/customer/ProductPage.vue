<template>
  <div>
    <PageBanner />
    <div class="product-page container mb-4 pt-md-6 pb-6">
      <div class="row justify-content-center">
        <div class="col-md-4 d-flex flex-column justify-content-center py-3">
          <nav aria-label="current page" class="d-md-none">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/">首頁</router-link>
              </li>
              <li class="breadcrumb-item">
                <a @click.prevent="goToProductList(product.category)" href="#">
                  {{ product.category }}</a
                >
              </li>
              <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
            </ol>
          </nav>
          <img :src="product.imageUrl" :alt="product.title" class="img-thumbnail bigImage" />
          <div class="mt-4 bg-white p-3 notes d-md-block d-none">
            <h5 class="text-danger">*購買須知</h5>
            <small
              >Mr.Potato所有產品皆為當日新鮮現做，最佳賞味期為一日，如有需要隔日食用，請務必將產品放入冷藏保鮮。
              <br />產品運送中可能會有包裝歪斜、保溫的問題，購買表示已同意以上風險。
            </small>
          </div>
        </div>
        <div class="col-md-4">
          <nav aria-label="current page" class="d-none d-md-block">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/">首頁</router-link>
              </li>
              <li class="breadcrumb-item">
                <a @click.prevent="goToProductList(product.category)" href="#">
                  {{ product.category }}</a
                >
              </li>
              <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
            </ol>
          </nav>
          <div class="d-flex align-items-center justify-content-between">
            <h2 class="my-4 fw-bolder">{{ product.title }}</h2>
            <a
              @click.prevent="addToFavorite(product.id, product)"
              href="#"
              aria-label="favoriteProduct"
              class="h2"
              :class="{ 'text-primary': favoriteProducts.includes(product.id) }"
              ><i class="fa-solid fa-heart"></i
            ></a>
          </div>
          <p class="fs-5">
            {{ product.description }}
          </p>
          <p class="fs-3 fw-bold mb-0 text-end">{{ $filters.currency(product.price) }}</p>
          <div class="d-flex justify-content-end">
            <div class="btn-toolbar my-4" role="toolbar" aria-label="Toolbar with button groups">
              <div class="input-group" role="group" aria-label="quantity input">
                <input
                  v-model="qty"
                  type="number"
                  class="form-control quantity"
                  min="1"
                  placeholder="1"
                  aria-label="quantity"
                  aria-describedby="quantity"
                />
              </div>
              <div class="btn-group ms-2" role="group" aria-label="submit button">
                <button
                  @click="addToCart(product.id, qty)"
                  type="button"
                  class="btn btn-primary text-white"
                >
                  <i class="bi bi-cart-fill"></i>加入購物車
                </button>
              </div>
            </div>
          </div>
          <small>
            <table class="table">
              <tbody>
                <tr>
                  <th scope="row">熱量</th>
                  <td>{{ nutrientFacts.kcal }}</td>
                </tr>
                <tr>
                  <th scope="row">蛋白質</th>
                  <td>{{ nutrientFacts.protein }}</td>
                </tr>
                <tr>
                  <th scope="row">碳水化合物</th>
                  <td>{{ nutrientFacts.carbs }}</td>
                </tr>
                <tr>
                  <th scope="row">脂肪</th>
                  <td>{{ nutrientFacts.fat }}</td>
                </tr>
                <tr>
                  <th scope="row">鈉</th>
                  <td>{{ nutrientFacts.sodium }}</td>
                </tr>
              </tbody>
            </table>
            <span class="text-danger">*營養成份未經過專業測量，僅供參考。</span>
          </small>
          <div class="mt-4 bg-white p-3 notes d-block d-md-none">
            <h5 class="text-danger">*購買須知</h5>
            <small
              >Mr.Potato所有產品皆為當日新鮮現做，最佳賞味期為一日，如有需要隔日食用，請務必將產品放入冷藏保鮮。
              <br />產品運送中可能會有包裝歪斜、保溫的問題，購買表示已同意以上風險。
            </small>
          </div>
        </div>
      </div>
    </div>
    <div class="container py-4 my-5 my-lg-8">
      <div class="row justify-content-center">
        <div
          class="col-md-8"
          data-aos="fade-zoom-in"
          data-aos-offset="0"
          data-aos-duration="800"
          data-aos-anchor-placement="top-center"
        >
          <h3 class="text-center text-primary mb-6">
            <span v-if="product.category === '純素主義'">搭配主食，營養更均衡</span>
            <span v-else>來點沙拉，補充膳食纖維</span>
          </h3>
          <ProductsItem :productData="recommendedProducts" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import PageBanner from '@/components/customer/PageBanner.vue';
import ProductsItem from '@/components/customer/ProductsItem.vue';

export default {
  name: 'ProductPage',
  components: {
    PageBanner,
    ProductsItem,
  },
  data() {
    return {
      product: {},
      nutrientFacts: [],
      path: '',
      qty: 1,
    };
  },
  methods: {
    ...mapActions('productsModules', ['getProducts']),
    getProduct(id) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
      vm.$http.get(api).then((response) => {
        vm.product = response.data.product;
        vm.nutrientFacts = JSON.parse(vm.product.content);
      });
    },
    getPageData() {
      this.getProduct(this.productId);
      this.getProducts();
      window.scrollTo(0, 0);
    },
    goToProductList(category) {
      const vm = this;
      switch (category) {
        case '純素主義':
          vm.path = 'vegetarian';
          break;
        case '原肉至上':
          vm.path = 'meat';
          break;
        case '就愛海味':
          vm.path = 'seafood';
          break;
        default:
          vm.path = 'all';
          break;
      }
      this.$router.push({ path: `/product_list/${vm.path}` });
    },
    addToCart(id, qty = 1) {
      this.$store.dispatch('cartsModules/addToCart', { id, qty });
    },
    addToFavorite(id, item) {
      this.$store.dispatch('productsModules/addToFavorite', { id, item });
    },
  },
  computed: {
    ...mapGetters('productsModules', ['lunchBoxProducts']),
    ...mapGetters('productsModules', ['saladProducts']),
    ...mapGetters('productsModules', ['favoriteProducts']),
    productId() {
      return this.$route.params.productId;
    },
    recommendedProducts() {
      const vm = this;
      let tempProducts = {};
      if (vm.product.category === '純素主義') {
        tempProducts = vm.lunchBoxProducts;
      } else {
        tempProducts = vm.saladProducts;
      }
      return tempProducts;
    },
  },
  created() {
    this.getPageData();
  },
  watch: {
    $route(to) {
      if (to.path.includes('/product_page')) {
        this.getPageData();
      }
    },
  },
};
</script>
