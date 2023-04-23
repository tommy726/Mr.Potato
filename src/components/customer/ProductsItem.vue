<template>
  <div
    :class="{ 'row-cols-lg-4': !path.includes('product_list') }"
    class="row row-cols-2 row-cols-lg-3 g-4 product-item"
  >
    <div v-for="productItem in productData" :key="productItem.id">
      <div class="card">
        <div class="card-img">
          <a @click.prevent="goToProductPage(productItem.id)" href="#" class="img-transform">
            <img :src="productItem.imageUrl" :alt="productItem.title" class="card-img-top" />
          </a>
        </div>
        <div class="card-body">
          <div class="d-flex justify-content-between">
            <h5 class="card-title">
              <a @click.prevent="goToProductPage(productItem.id)" href="#">
                {{ productItem.title }}
              </a>
            </h5>
            <a
              @click.prevent="addToFavorite(productItem.id, productItem)"
              href="#"
              aria-label="favoriteProduct"
              :class="{ 'text-primary': favoriteProducts.includes(productItem.id) }"
              ><i class="fa-solid fa-heart"></i
            ></a>
          </div>
          <div class="d-flex justify-content-between">
            <a @click.prevent="goToProductPage(productItem.id)" href="#">營養成份</a>
            <span>{{ $filters.currency(productItem.price) }}</span>
          </div>
        </div>
        <div class="card-footer">
          <button @click="addToCart(productItem.id)" type="button" class="btn">加入購物車</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ProductsItem',
  props: ['productData'],
  methods: {
    ...mapActions('cartsModules', ['getCart']),
    goToProductPage(id) {
      this.$router.push({ path: `/product_page/${id}` });
    },
    addToCart(id, qty = 1) {
      this.$store.dispatch('cartsModules/addToCart', { id, qty });
    },
    updateCart(id, qty, cartId) {
      this.$store.dispatch('cartsModules/updateCart', { id, qty, cartId });
    },
    addToFavorite(id, item) {
      this.$store.dispatch('productsModules/addToFavorite', { id, item });
    },
  },
  computed: {
    ...mapGetters('productsModules', ['favoriteProducts']),
    ...mapGetters('cartsModules', ['cart']),
    path() {
      return this.$route.path;
    },
  },
  created() {
    this.getCart();
  },
};
</script>
