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
                @click="openModal(false, productItem)"
                type="button"
                class="btn btn-outline-info white-text-btn"
              >
                編輯
              </button>
              <RemoveModal :data="productItem" @remove="removeProduct(productItem.id)" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- pagination -->
    <DashboardPagination :pagination-data="pagination" @getPagination="getProducts" />

    <!-- product modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      aria-labelledby="productModalLabel"
      aria-hidden="true"
      data-bs-backdrop="static"
      ref="productModal"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header bg-info text-white">
            <h1 v-if="newProductItem" class="modal-title fs-5" id="productModalLabel">新增產品</h1>
            <h1 v-else class="modal-title fs-5" id="productModalLabel">
              編輯 {{ tempProduct.title }}
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body max-width-input">
            <div class="row">
              <div class="col-sm-4">
                <div class="row g-3">
                  <div class="col-12">
                    <label for="image" class="form-label"
                      >輸入圖片網址
                      <input
                        v-model="tempProduct.imageUrl"
                        type="text"
                        class="form-control"
                        id="image"
                        placeholder="請輸入圖片連結"
                      />
                    </label>
                  </div>
                  <div class="col-12">
                    <label for="customFile" class="form-label"
                      >或 上傳圖片
                      <i v-if="fileUploading" class="fas fa-spinner fa-pulse"></i>
                      <input
                        @change="uploadFile"
                        type="file"
                        id="customFile"
                        class="form-control"
                        ref="files"
                      />
                    </label>
                  </div>
                  <img
                    v-if="tempProduct.imageUrl"
                    :src="tempProduct.imageUrl"
                    :alt="tempProduct.title"
                    class="img-fluid my-3"
                  />
                </div>
              </div>
              <div class="col-sm-8">
                <div class="row g-3">
                  <div class="col-md-6">
                    <label for="title" class="form-label"
                      >商品名稱
                      <input
                        v-model="tempProduct.title"
                        type="text"
                        class="form-control"
                        id="title"
                        placeholder="請輸入商品名稱"
                      />
                    </label>
                  </div>
                  <div class="col-md-6">
                    <label for="category" class="form-label"
                      >分類
                      <input
                        v-model="tempProduct.category"
                        type="text"
                        class="form-control"
                        id="category"
                        placeholder="請輸入分類"
                      />
                    </label>
                  </div>
                  <div class="col-lg-4 col-6">
                    <label for="unit" class="form-label"
                      >單位
                      <input
                        v-model="tempProduct.unit"
                        type="text"
                        class="form-control"
                        id="unit"
                        placeholder="請輸入單位"
                      />
                    </label>
                  </div>
                  <div class="col-lg-4 col-6">
                    <label for="price" class="form-label"
                      >售價
                      <input
                        v-model="tempProduct.price"
                        type="number"
                        class="form-control"
                        id="price"
                        placeholder="請輸入售價"
                      />
                    </label>
                  </div>
                  <div class="col-lg-4 align-self-center">
                    <div class="form-check">
                      <label class="form-check-label" for="is_enabled">
                        是否啟用
                        <input
                          v-model="tempProduct.is_enabled"
                          :true-value="1"
                          :false-value="0"
                          class="form-check-input"
                          type="checkbox"
                          id="is_enabled"
                        />
                      </label>
                    </div>
                  </div>
                  <hr />
                  <div class="col-12">
                    <label for="content" class="form-label"
                      >產品描述
                      <textarea
                        v-model="tempProduct.description"
                        type="text"
                        class="form-control"
                        id="content"
                        placeholder="請輸入產品描述"
                      ></textarea>
                    </label>
                  </div>
                  <div class="col-12">
                    <label for="description" class="form-label"
                      >產品內容
                      <textarea
                        v-model="tempProduct.content"
                        type="text"
                        class="form-control"
                        id="description"
                        placeholder='{"kcal":","protein":","carbs":","fat":","sodium":"}'
                      ></textarea>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
              取消
            </button>
            <button @click="updateProduct" type="button" class="btn btn-info text-white">
              確定
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';
import DashboardPagination from '@/components/dashboard/DashboardPagination.vue';
import RemoveModal from '@/components/dashboard/RemoveModal.vue';

export default {
  name: 'AdminProducts',
  components: {
    DashboardPagination,
    RemoveModal,
  },
  data() {
    return {
      products: [],
      tempProduct: {},
      pagination: {},
      newProductItem: false,
      fileUploading: false,
    };
  },
  methods: {
    getProducts(page = 1) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products?page=${page}`;
      vm.$store.dispatch('updateLoading', true);
      vm.$http.get(api)
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
    updateProduct() {
      const vm = this;
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`;
      let httpMethod = 'post';
      if (!vm.newProductItem) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
        httpMethod = 'put';
      }
      vm.$http[httpMethod](api, { data: vm.tempProduct })
        .then((response) => {
          if (response.data.success) {
            vm.$store.dispatch('alertModules/updateMessage', {
              message: response.data.message,
              status: response.data.success,
            });
          } else {
            vm.$store.dispatch('alertModules/updateMessage', {
              message: response.data.message,
              status: response.data.success,
            });
          }
          vm.productModal.hide();
          vm.getProducts();
        })
        .catch(() => {
          vm.$store.dispatch('alertModules/updateMessage', {
            message: '資料取得失敗，請確認api是否正確',
            status: false,
          });
        });
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
    uploadFile() {
      const vm = this;
      const uploadedFile = vm.$refs.files.files[0];
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`;
      const formData = new FormData();
      formData.append('file-to-upload', uploadedFile);
      vm.fileUploading = true;
      vm.$http
        .post(api, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          if (response.data.success) {
            vm.tempProduct.imageUrl = response.data.imageUrl;
            vm.fileUploading = false;
          } else if (response.data.message === '檔案格式錯誤') {
            vm.$store.dispatch('alertModules/updateMessage', {
              message: '檔案格式錯誤',
              status: response.data.success,
            });
            vm.fileUploading = false;
          } else {
            vm.$store.dispatch('alertModules/updateMessage', {
              message: '圖片過大，請勿超過1MB，請重新選擇圖片',
              status: response.data.success,
            });
            vm.fileUploading = false;
          }
        })
        .catch(() => {
          vm.$store.dispatch('alertModules/updateMessage', {
            message: '資料取得失敗，請確認api是否正確',
            status: false,
          });
        });
    },
    openModal(newProductItem, productItem) {
      const vm = this;
      if (newProductItem) {
        vm.tempProduct = {};
        vm.newProductItem = true;
        vm.productModal.show();
      } else {
        vm.tempProduct = { ...productItem };
        vm.newProductItem = false;
        vm.productModal.show();
      }
    },
  },
  created() {
    this.getProducts();
  },
  mounted() {
    const vm = this;
    vm.productModal = new Modal(vm.$refs.productModal);
  },
};
</script>
