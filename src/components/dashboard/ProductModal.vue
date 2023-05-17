<template>
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
          <h1 v-if="isNew" class="modal-title fs-5" id="productModalLabel">新增產品</h1>
          <h1 v-else class="modal-title fs-5" id="productModalLabel">編輯 {{ product.title }}</h1>
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
                      v-model="product.imageUrl"
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
                  v-if="product.imageUrl"
                  :src="product.imageUrl"
                  :alt="product.title"
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
                      v-model="product.title"
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
                      v-model="product.category"
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
                      v-model="product.unit"
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
                      v-model="product.price"
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
                        v-model="product.is_enabled"
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
                      v-model="product.description"
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
                      v-model="product.content"
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
          <button @click="updateProduct" type="button" class="btn btn-info text-white">確定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';

export default {
  name: 'ProductModal',
  props: ['temp-data', 'isNew'],
  data() {
    return {
      product: {},
      fileUploading: false,
    };
  },
  methods: {
    openModal() {
      this.productModal.show();
    },
    updateProduct() {
      const vm = this;
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`;
      let httpMethod = 'post';
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.product.id}`;
        httpMethod = 'put';
      }
      vm.$http[httpMethod](api, { data: vm.product })
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
          vm.$emit('update');
          vm.productModal.hide();
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
            vm.product.imageUrl = response.data.imageUrl;
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
  },
  watch: {
    tempData(item) {
      this.product = item;
    },
  },
  mounted() {
    this.productModal = new Modal(this.$refs.productModal);
  },
};
</script>
