<template>
  <div>
    <div class="d-flex justify-content-between">
      <h2><i class="fa-solid fa-box-open me-1"></i>產品列表</h2>
      <button @click="openModal(true)" type="button" class="btn btn-info text-white">
        新增商品
      </button>
    </div>

    <!-- products list -->
    <div class="table-responsive text-nowrap">
      <table class="table table-hover mt-4 align-middle">
        <thead>
          <tr>
            <th width="150" class="text-center">產品圖片</th>
            <th width="120">產品分類</th>
            <th>產品名稱</th>
            <th width="120" class="text-right">售價</th>
            <th width="100" class="text-center">是否啟用</th>
            <th width="150" class="text-center">修改商品</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(productItem, key) in products" :key="key">
            <td><img :src="productItem.imageUrl" :alt="productItem.title" class="w-100" /></td>
            <td>{{ productItem.category }}</td>
            <td>{{ productItem.title }}</td>
            <td class="text-right">{{ $filters.currency(productItem.price) }}</td>
            <td class="text-center">
              <span v-if="productItem.is_enabled" class="text-success">啟用</span>
              <span v-else>未啟用</span>
            </td>
            <td class="text-center">
              <button
                @click="openModal(false, false, productItem)"
                type="button"
                class="btn btn-outline-info white-text-btn"
              >
                編輯
              </button>
              <button
                @click="openModal(false, true, productItem)"
                type="button"
                class="btn btn-outline-danger ms-2"
              >
                刪除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- pagination -->
    <DashboardPagination :pagination-data="pagination" @getPagination="getProducts" />

    <!-- product modal -->
    <ProductModal
      :temp-data="tempProduct"
      :is-new="isNew"
      @update="getProducts"
      ref="productModal"
    />
    <RemoveModal
      :temp-data="tempProduct"
      @remove="removeProduct"
      ref="removeModal"
    />
  </div>
</template>

<script>
import DashboardPagination from '@/components/dashboard/DashboardPagination.vue';
import ProductModal from '@/components/dashboard/ProductModal.vue';
import RemoveModal from '@/components/dashboard/RemoveModal.vue';

export default {
  name: 'AdminProducts',
  components: {
    DashboardPagination,
    ProductModal,
    RemoveModal,
  },
  data() {
    return {
      products: [],
      tempProduct: {},
      pagination: {},
      isNew: false,
    };
  },
  methods: {
    getProducts(page = 1) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products?page=${page}`;
      vm.$store.dispatch('updateLoading', true);
      vm.$http
        .get(api)
        .then((response) => {
          vm.products = response.data.products;
          vm.pagination = response.data.pagination;
          vm.$store.dispatch('updateLoading', false);
        })
        .catch(() => {
          vm.$store.dispatch('alertModules/updateMessage', {
            message: '資料取得失敗，請確認api是否正確',
            status: false,
          });
        });
    },
    openModal(isNew, remove, productItem) {
      if (isNew) {
        this.tempProduct = {};
        this.isNew = true;
        this.$refs.productModal.openModal();
      } else if (!isNew && !remove) {
        this.tempProduct = { ...productItem };
        this.isNew = false;
        this.$refs.productModal.openModal();
      } else {
        this.tempProduct = { ...productItem };
        this.$refs.removeModal.openModal();
      }
    },
    removeProduct() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
      vm.$http.delete(api)
        .then((response) => {
          vm.$store.dispatch('alertModules/updateMessage', {
            message: response.data.message,
            status: response.data.success,
          });
          vm.getProducts();
        })
        .catch(() => {
          vm.$store.dispatch('alertModules/updateMessage', {
            message: '資料取得失敗，請確認api是否正確',
            status: false,
          });
        });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
