<template>
  <div class="row row-cols-2 row-cols-md-3 g-4 product-item">
    <div v-for="productItem in productData" :key="productItem.id" class="col">
      <div class="card">
        <div class="card-img">
          <a @click.prevent="goToProductPage(productItem.id)" href="#" class="img-transform"
            ><img :src="productItem.imageUrl" :alt="productItem.title" class="card-img-top"
          /></a>
        </div>
        <div class="card-body">
          <h5 class="card-title">
            {{ productItem.title }}
          </h5>
          <div class="d-flex justify-content-between">
            <a @click.prevent="goToProductPage(productItem.id)" href="#">營養成份</a>
            <span>{{ $filters.currency(productItem.price) }}</span>
          </div>
        </div>
        <div class="card-footer">
          <button @click="addToCart(productItem.id)"
          type="button" class="btn">加入購物車</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductsItem',
  props: ['productData'],
  methods: {
    goToProductPage(id) {
      this.$router.push({ path: `/product_page/${id}` });
    },
    addToCart(id, qty = 1) {
      this.$store.dispatch('cartsModules/addToCart', { id, qty });
    },
  },
};
</script>
