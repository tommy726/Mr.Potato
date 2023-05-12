<template>
  <div class="flex-grow-1">
    <PageBanner />
    <div class="container py-4 my-5 my-lg-8">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <h2 class="h1 mb-4 mb-md-8">收藏商品</h2>
          <ProductsItem :productData="filterFavorite" />
          <div v-if="!filterFavorite.length" class="text-center my-6">
            <h3 class="mb-5">目前沒有收藏中的商品!</h3>
            <router-link to="/product_list/all" class="btn btn-primary text-white">
              點我去逛逛
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PageBanner from '@/components/customer/PageBanner.vue';
import ProductsItem from '@/components/customer/ProductsItem.vue';

export default {
  name: 'FavoriteProduct',
  components: {
    PageBanner,
    ProductsItem,
  },
  computed: {
    ...mapGetters('productsModules', ['favoriteProducts']),
    filterFavorite() {
      const vm = this;
      const newData = vm.favoriteProducts.filter((item) => item.is_enabled === 1);
      return newData;
    },
  },
};
</script>
