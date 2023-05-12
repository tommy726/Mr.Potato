<template>
  <div class="flex-grow-1">
    <PageBanner />
    <div class="container my-4 my-md-8">
      <div class="row justify-content-center">
        <div class="col-md-3 mb-6 product-list">
          <div class="top sticky-md-top">
            <h3>Categories</h3>
            <div class="list-group flex-row flex-md-column justify-content-between">
              <router-link
                class="list-group-item"
                :class="{ active: productCategory == 'all' }"
                to="all"
                >所有產品</router-link
              >
              <router-link
                class="list-group-item"
                :class="{ active: productCategory == 'vegetarian' }"
                to="vegetarian"
                >純素主義</router-link
              >
              <router-link
                class="list-group-item"
                :class="{ active: productCategory == 'meat' }"
                to="meat"
                >原肉至上</router-link
              >
              <router-link
                class="list-group-item"
                :class="{ active: productCategory == 'seafood' }"
                to="seafood"
                >就愛海味</router-link
              >
            </div>
          </div>
        </div>
        <div class="col-md-7">
          <ProductsItem :productData="filterCategory" />
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
  name: 'ProductList',
  components: {
    PageBanner,
    ProductsItem,
  },
  data() {
    return {
      categories: {
        all: 'all',
        vegetarian: '純素主義',
        meat: '原肉至上',
        seafood: '就愛海味',
      },
    };
  },
  methods: {
    ...mapActions('productsModules', ['getProducts']),
  },
  computed: {
    ...mapGetters('productsModules', ['filterProducts']),
    filterCategory() {
      const vm = this;
      let filterCategory = {};
      if (vm.productCategory === `${vm.categories.all}`) {
        filterCategory = vm.filterProducts;
      } else {
        filterCategory = vm.filterProducts.filter(
          (item) => item.category === `${vm.categories[vm.productCategory]}`,
        );
      }
      return filterCategory;
    },
    productCategory() {
      return this.$route.params.productCategory;
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
