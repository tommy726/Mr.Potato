<template>
  <div>
    <div class="product-page container mb-4 pt-md-6 pb-6">
      <div class="row justify-content-center">
        <div class="col-md-4 d-flex flex-column justify-content-center py-3">
          <nav aria-label="current page" class="d-md-none">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/">Home</router-link>
              </li>
              <li class="breadcrumb-item">
                <a @click.prevent="goToProductList(`${product.category}`)" href="#">
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
                <router-link to="/">Home</router-link>
              </li>
              <li class="breadcrumb-item">
                <a @click.prevent="goToProductList(product.category)" href="#">
                  {{ product.category }}</a
                >
              </li>
              <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
            </ol>
          </nav>
          <h2 class="my-4 fw-bolder">{{ product.title }}</h2>
          <p>
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
                  <td>{{ content[0] }}</td>
                </tr>
                <tr>
                  <th scope="row">蛋白質</th>
                  <td>{{ content[1] }}</td>
                </tr>
                <tr>
                  <th scope="row">碳水化合物</th>
                  <td>{{ content[2] }}</td>
                </tr>
                <tr>
                  <th scope="row">脂肪</th>
                  <td>{{ content[3] }}</td>
                </tr>
                <tr>
                  <th scope="row">鈉</th>
                  <td>{{ content[4] }}</td>
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
    <div class="container my-5 my-xxl-8">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <h3 class="text-center text-primary mb-4">也許您還想吃？</h3>
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
  name: 'ProductPage',
  components: {
    ProductsItem,
  },
  data() {
    return {
      productId: '',
      product: {},
      content: [],
      path: '',
      qty: 1,
    };
  },
  methods: {
    ...mapActions('productsModules', ['getProducts']),
    getPageData() {
      this.productId = this.$route.params.productId;
      this.getProduct(this.productId);
      this.getProducts();
      window.scrollTo(0, 0);
    },
    getProduct(id) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
      vm.$http.get(api).then((response) => {
        vm.product = response.data.product;
        vm.content = vm.product.content.split(',');
      });
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
  },
  computed: {
    ...mapGetters('productsModules', ['randomProducts']),
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
