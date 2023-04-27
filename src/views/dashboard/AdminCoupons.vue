<template>
  <div>
    <div class="d-flex justify-content-between">
      <h2><i class="fa-solid fa-ticket me-1"></i>管理優惠券</h2>
      <button @click="openModal(true)" type="button" class="btn btn-info text-white">
        新增優惠券
      </button>
    </div>

    <!-- coupons list -->
    <div class="table-responsive text-nowrap">
      <table class="table table-striped mt-4 align-middle">
        <thead>
          <tr>
            <th>優惠券名稱</th>
            <th>優惠碼</th>
            <th class="text-end">折扣百分比</th>
            <th class="text-center">到期日</th>
            <th width="150" class="text-center">是否啟用</th>
            <th width="150" class="text-center">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(couponItem, key) in coupons" :key="key">
            <td>{{ couponItem.title }}</td>
            <td>{{ couponItem.code }}</td>
            <td class="text-end">{{ couponItem.percent }} %</td>
            <td class="text-center">{{ $filters.date(couponItem.due_date) }}</td>
            <td class="text-center">
              <span v-if="couponItem.is_enabled" class="text-success">啟用</span>
              <span v-else>未啟用</span>
            </td>
            <td class="text-center">
              <button
                @click="openModal(false, couponItem)"
                type="button"
                class="btn btn-outline-info white-text-btn"
              >
                編輯
              </button>
              <RemoveModal :data="couponItem" @remove="removeCoupon(couponItem.id)" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- pagination -->
    <DashboardPagination :pagination-data="pagination" @getPagination="getCoupons" />

    <!-- coupon modal -->
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
            <h1 v-if="newCouponItem" class="modal-title fs-5" id="couponModalLabel">新增優惠券</h1>
            <h1 v-else class="modal-title fs-5" id="couponModalLabel">
              編輯 {{ tempCoupon.title }}
            </h1>
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
            <button @click="updateCoupon" type="button" class="btn btn-info text-white">
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
  name: 'AdminCoupons',
  components: {
    DashboardPagination,
    RemoveModal,
  },
  data() {
    return {
      coupons: [],
      tempCoupon: {
        title: '',
        code: '',
        due_date: 0,
        percent: 0,
        is_enabled: 0,
      },
      due_date: '',
      pagination: {},
      newCouponItem: false,
    };
  },
  watch: {
    due_date() {
      const vm = this;
      const timestamp = Math.floor(new Date(vm.due_date) / 1000);
      vm.tempCoupon.due_date = timestamp;
    },
  },
  methods: {
    getCoupons(page = 1) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`;
      vm.$store.dispatch('updateLoading', true);
      vm.$http
        .get(api)
        .then((response) => {
          vm.coupons = response.data.coupons;
          vm.pagination = response.data.pagination;
          vm.isLoading = false;
          vm.$store.dispatch('updateLoading', false);
        })
        .catch(() => {
          vm.$store.dispatch('alertModules/updateMessage', {
            message: '資料取得失敗，請確認api是否正確',
            status: false,
          });
        });
    },
    updateCoupon() {
      const vm = this;
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`;
      let httpMethod = 'post';
      if (!vm.newCouponItem) {
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
          vm.couponModal.hide();
          vm.getCoupons();
        })
        .catch(() => {
          vm.$store.dispatch('alertModules/updateMessage', {
            message: '資料取得失敗，請確認api是否正確',
            status: false,
          });
        });
    },
    removeCoupon(id) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${id}`;
      vm.$http.delete(api)
        .then((response) => {
          vm.$store.dispatch('alertModules/updateMessage', {
            message: response.data.message,
            status: response.data.success,
          });
          vm.getCoupons();
        })
        .catch(() => {
          vm.$store.dispatch('alertModules/updateMessage', {
            message: '資料取得失敗，請確認api是否正確',
            status: false,
          });
        });
    },
    openModal(newCouponItem, couponItem) {
      const vm = this;
      if (newCouponItem) {
        vm.tempCoupon = {};
        const [newCouponDate] = new Date(+new Date() + 8 * 3600 * 1000).toISOString().split('T');
        vm.due_date = `${newCouponDate}`;
        vm.newCouponItem = true;
        vm.couponModal.show();
      } else {
        vm.tempCoupon = { ...couponItem };
        const [tempCouponDate] = new Date(vm.tempCoupon.due_date * 1000).toISOString().split('T');
        vm.due_date = `${tempCouponDate}`;
        vm.newCouponItem = false;
        vm.couponModal.show();
      }
    },
  },
  created() {
    this.getCoupons();
  },
  mounted() {
    const vm = this;
    vm.couponModal = new Modal(vm.$refs.couponModal);
  },
};
</script>
