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
            <span class="text-danger">*營養成份僅供參考。</span>
          </small>
        </div>
        <div class="col-md-8 my-md-8 my-6">
          <div class="accordion" id="notesAccordion">
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingOne">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="false"
                  aria-controls="collapseOne"
                >
                  # 商品買錯了，可以退換貨嗎?
                </button>
              </h2>
              <div
                id="collapseOne"
                class="accordion-collapse collapse"
                aria-labelledby="headingOne"
                data-bs-parent="#notesAccordionExample"
              >
                <div class="accordion-body">
                  <p>
                    如果您在購買當下、外送核對餐點時、用餐時發現商品瑕疵貨品項錯誤，請立即連繫我們，將為您提供退換貨。
                  </p>
                  <span class="text-danger">
                    商品運送中可能會有包裝歪斜、保溫的問題，訂餐表示已同意以上風險，如有相關的問題發生，將不提供退換貨。
                  </span>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingTwo">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  # 商品隔餐保存方法
                </button>
              </h2>
              <div
                id="collapseTwo"
                class="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#notesAccordionExample"
              >
                <div class="accordion-body">
                  <p>
                    Mr.Potato所有產品皆為當下新鮮現做，如有需要隔餐食用，請務必將產品放入冷藏(冷凍)保存，並在需要用餐時充分加熱。
                  </p>
                  <ul>
                    <li><strong>冷藏保存</strong>：最多保存兩天，盡量盡早食用完畢。</li>
                    <li>
                      <strong>冷凍保存</strong>：可以保存較長時間，基於衛生安全，建議不要超過一周。
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingThree">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  # 隔夜餐盒加熱技巧
                </button>
              </h2>
              <div
                id="collapseThree"
                class="accordion-collapse collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#notesAccordionExample"
              >
                <div class="accordion-body">
                  <p>Mr.Potato 提供的餐盒皆為熟食，隔餐食用僅需要加熱，以下提供參考方法：</p>
                  <ul>
                    <li>
                      <strong>微波</strong
                      >：將產品退冰並移到盤中，700W微波3分鐘，加熱時間可能因微波爐不同而異。
                    </li>
                    <li>
                      <strong>電鍋</strong>：將產品移到盤中，放入1/2杯水（150ml），待電鍋跳起。
                    </li>
                    <li><strong>烤箱</strong>：將產品移到盤中，180度加熱6分鐘或到達食用溫度。</li>
                  </ul>
                </div>
              </div>
            </div>
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
          <h4 class="text-center text-primary mb-6 h3">
            <span v-if="product.category === '純素主義'">搭配主食，營養更均衡</span>
            <span v-else>來點沙拉，補充膳食纖維</span>
          </h4>
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
      vm.$http.get(api)
        .then((response) => {
          vm.product = response.data.product;
          vm.nutrientFacts = JSON.parse(vm.product.content);
        })
        .catch(() => {
          vm.$store.dispatch('alertModules/updateMessage', {
            message: '資料取得失敗，請確認api是否正確',
            status: false,
          });
        });
    },
    getPageData() {
      const vm = this;
      vm.getProduct(vm.productId);
      vm.getProducts();
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
      vm.$router.push({ path: `/product_list/${vm.path}` });
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
