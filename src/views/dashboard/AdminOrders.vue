<template>
  <div class="table-responsive">
    <div class="d-md-flex justify-content-between align-items-center">
      <h2><i class="fa-solid fa-list-check me-1"></i>訂單列表</h2>
      <div class="d-flex">
        <div class="form-check">
          <label class="form-check-label" for="all">
            所有訂單
            <input
              v-model="isPaid"
              value="all"
              class="form-check-input"
              type="radio"
              name="is_paid"
              id="all"
            />
          </label>
        </div>
        <div class="form-check ms-3">
          <label class="form-check-label" for="unpaid">
            未付款
            <input
              v-model="isPaid"
              value="false"
              class="form-check-input"
              type="radio"
              name="is_paid"
              id="unpaid"
            />
          </label>
        </div>
        <div class="form-check ms-3">
          <label class="form-check-label" for="paid">
            已付款
            <input
              v-model="isPaid"
              value="true"
              class="form-check-input"
              type="radio"
              name="is_paid"
              id="paid"
            />
          </label>
        </div>
      </div>
    </div>
    <table class="table mt-4 text-nowrap">
      <thead>
        <tr>
          <th>購買時間</th>
          <th>顧客姓名</th>
          <th>Email</th>
          <th>訂購項目</th>
          <th>應付金額</th>
          <th>付款方式</th>
          <th colspan="2">是否付款</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filterData" :key="item.id" :class="{ 'text-secondary': !item.is_paid }">
          <td>{{ $filters.date(item.create_at) }}</td>
          <td>{{ item.user.name }}</td>
          <td><span v-text="item.user.email" v-if="item.user"></span></td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(product, index) in item.products" :key="index">
                {{ product.product.title }} : {{ product.qty }}{{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td class="text-center">{{ $filters.currency(item.total) }}</td>
          <td>{{ item.user.payment }}</td>
          <td>
            <strong v-if="item.is_paid" class="text-success">已付款</strong>
            <span v-else class="text-danger">未付款</span>
          </td>
          <td>
            <button @click="openModal(item.id)" type="button" class="btn btn-info text-white">
              顧客資訊
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- info modal -->
    <div
      class="modal fade"
      id="infoModal"
      tabindex="-1"
      aria-labelledby="infoModalLabel"
      aria-hidden="true"
      ref="infoModal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-info text-white text-center">
            <h1 class="modal-title fs-5 ms-auto" id="infoModalLabel">顧客資訊</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body px-4">
            <div class="table-responsive">
              <table class="table align-middle text-nowrap">
                <tbody>
                  <tr>
                    <th scope="row" class="text-center" width="50%">姓名</th>
                    <td>{{ userInfo.user.name }}</td>
                  </tr>
                  <tr>
                    <th scope="row" class="text-center">聯絡電話</th>
                    <td>{{ userInfo.user.tel }}</td>
                  </tr>
                  <tr>
                    <th scope="row" class="text-center">聯絡信箱</th>
                    <td>{{ userInfo.user.email }}</td>
                  </tr>
                  <tr>
                    <th scope="row" class="text-center">送餐地址</th>
                    <td>{{ userInfo.user.address }}</td>
                  </tr>
                  <tr>
                    <th scope="row" class="text-center">社區大樓</th>
                    <td>{{ userInfo.user.community }}</td>
                  </tr>
                  <tr>
                    <th scope="row" class="text-center">結帳方式</th>
                    <td>{{ userInfo.user.payment }}</td>
                  </tr>
                  <tr>
                    <th scope="row" class="text-center">特殊備註</th>
                    <td>{{ userInfo.message }}</td>
                  </tr>
                  <tr>
                    <th scope="row" class="text-center">是否付款</th>
                    <td v-if="userInfo.is_paid" class="text-success">已付款</td>
                    <td v-else class="text-danger">未付款</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button
              type="button"
              class="btn btn-outline-secondary d-block ms-auto"
              data-bs-dismiss="modal"
            >
              關閉
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- pagination -->
    <DashboardPagination :pagination-data="pagination" @getPagination="getOrder" />
  </div>
</template>

<script>
import { Modal } from 'bootstrap';
import DashboardPagination from '@/components/dashboard/DashboardPagination.vue';

export default {
  name: 'AdminOrders',
  components: {
    DashboardPagination,
  },
  data() {
    return {
      orderData: {
        orders: {},
      },
      userInfo: {
        user: {},
      },
      pagination: {},
      isPaid: 'all',
      filterData: {},
    };
  },
  methods: {
    getOrder(page = 1) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`;
      vm.$store.dispatch('updateLoading', true);
      vm.$http.get(api).then((response) => {
        vm.orderData = response.data;
        vm.pagination = response.data.pagination;
        if (vm.isPaid === 'all') {
          vm.filterData = vm.orderData.orders;
        } else if (vm.isPaid === 'true') {
          vm.filterData = vm.orderData.orders.filter((item) => item.is_paid === true);
        } else if (vm.isPaid === 'false') {
          vm.filterData = vm.orderData.orders.filter((item) => item.is_paid === false);
        }
        vm.$store.dispatch('updateLoading', false);
      });
    },
    openModal(id) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${id}`;
      vm.infoModal.show();
      vm.$store.dispatch('updateLoading', true);
      vm.$http.get(api).then((response) => {
        if (response.data.order) {
          vm.userInfo = response.data.order;
        } else {
          vm.infoModal.hide();
        }
      });
      vm.$store.dispatch('updateLoading', false);
    },
  },
  created() {
    this.getOrder();
  },
  watch: {
    isPaid() {
      this.getOrder();
    },
  },
  mounted() {
    this.infoModal = new Modal(this.$refs.infoModal);
  },
};
</script>
