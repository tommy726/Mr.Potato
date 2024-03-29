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
                @click="openModal(false, false, couponItem)"
                type="button"
                class="btn btn-outline-info white-text-btn"
              >
                編輯
              </button>
              <button
                @click="openModal(false, true, couponItem)"
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
    <DashboardPagination :pagination-data="pagination" @getPagination="getCoupons" />

    <CouponModal
      :temp-data="tempCoupon"
      :is-new="isNew"
      :due-date="due_date"
      @update="getCoupons"
      ref="couponModal"
    />
    <RemoveModal
      :temp-data="tempCoupon"
      @remove="removeCoupon(tempCoupon.id)"
      ref="removeModal"
    />
  </div>
</template>

<script>
import DashboardPagination from '@/components/dashboard/DashboardPagination.vue';
import CouponModal from '@/components/dashboard/CouponModal.vue';
import RemoveModal from '@/components/dashboard/RemoveModal.vue';

export default {
  name: 'AdminCoupons',
  components: {
    DashboardPagination,
    CouponModal,
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
      isNew: false,
    };
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
    openModal(isNew, remove, couponItem) {
      if (isNew) {
        this.tempCoupon = {};
        const [newCouponDate] = new Date(+new Date() + 8 * 3600 * 1000).toISOString().split('T');
        this.due_date = `${newCouponDate}`;
        this.isNew = true;
        this.$refs.couponModal.openModal();
      } else if (!isNew && !remove) {
        this.tempCoupon = { ...couponItem };
        const [tempCouponDate] = new Date(this.tempCoupon.due_date * 1000).toISOString().split('T');
        this.due_date = `${tempCouponDate}`;
        this.isNew = false;
        this.$refs.couponModal.openModal();
      } else {
        this.tempCoupon = { ...couponItem };
        this.$refs.removeModal.openModal();
      }
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>
