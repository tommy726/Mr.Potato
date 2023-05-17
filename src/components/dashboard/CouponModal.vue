<template>
  <div
    class="modal fade"
    id="couponModal"
    tabindex="-1"
    aria-labelledby="couponModalLabel"
    aria-hidden="true"
    data-bs-backdrop="static"
    ref="couponModal"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-info text-white">
          <h1 v-if="isNew" class="modal-title fs-5" id="couponModalLabel">新增優惠券</h1>
          <h1 v-else class="modal-title fs-5" id="couponModalLabel">編輯 {{ tempCoupon.title }}</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body max-width-input px-6">
          <div class="input-group mb-3">
            <label for="title" class="form-label"
              >優惠券名稱
              <input
                v-model="tempCoupon.title"
                type="text"
                class="form-control"
                id="title"
                placeholder="請輸入名稱"
              />
            </label>
          </div>
          <div class="input-group mb-3">
            <label for="code" class="form-label"
              >優惠碼
              <input
                v-model="tempCoupon.code"
                type="text"
                class="form-control"
                id="code"
                placeholder="請輸入優惠碼"
              />
            </label>
          </div>
          <div class="input-group mb-3">
            <label for="due_date" class="form-label"
              >到期日
              <input v-model="due_date" type="date" class="form-control" id="due_date" />
            </label>
          </div>
          <div class="input-group mb-3">
            <label for="percent" class="form-label"
              >折扣百分比(%)
              <input
                v-model="tempCoupon.percent"
                type="number"
                class="form-control"
                id="percent"
                placeholder="請輸入折扣百分比"
              />
            </label>
          </div>
          <div class="input-group">
            <div class="form-check">
              <label class="form-check-label" for="is_enabled">
                是否啟用
                <input
                  v-model="tempCoupon.is_enabled"
                  class="form-check-input"
                  type="checkbox"
                  id="is_enabled"
                />
              </label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button @click="updateCoupon" type="button" class="btn btn-info text-white">確定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';

export default {
  name: 'CouponModal',
  props: ['temp-data', 'due-date', 'isNew'],
  data() {
    return {
      tempCoupon: {
        title: '',
        code: '',
        due_date: 0,
        percent: 0,
        is_enabled: 0,
      },
      due_date: '',
    };
  },
  methods: {
    openModal() {
      this.couponModal.show();
    },
    updateCoupon() {
      const vm = this;
      const timestamp = Math.floor(new Date(vm.due_date) / 1000);
      vm.tempCoupon.due_date = timestamp;
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`;
      let httpMethod = 'post';
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
        httpMethod = 'put';
      }
      vm.$http[httpMethod](api, { data: vm.tempCoupon })
        .then((response) => {
          if (response.data.success) {
            vm.$store.dispatch('alertModules/updateMessage', {
              message: response.data.message,
              status: response.data.success,
            });
          } else {
            vm.$store.dispatch('alertModules/updateMessage', {
              message: '請確認api是否正確',
              status: response.data.success,
            });
          }
          this.due_date = this.dueDate;
          vm.$emit('update');
          vm.couponModal.hide();
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
      this.tempCoupon = item;
    },
    dueDate(item) {
      this.due_date = item;
    },
  },
  mounted() {
    const vm = this;
    vm.couponModal = new Modal(vm.$refs.couponModal);
  },
};
</script>
