<template>
  <div>
    <div class="card mb-5">
      <div class="card-header text-center bg-warning">
        <h5 class="card-title my-2">訂單資訊</h5>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table align-middle text-nowrap">
            <thead>
              <tr>
                <th colspan="2" scope="col">商品名稱</th>
                <th scope="col" class="text-end" width="100">數量</th>
                <th scope="col" class="text-end">總價</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in order.products" :key="item.id">
                <td scope="row">
                  <img
                    :src="item.product.imageUrl"
                    :alt="item.product.title"
                    class="checkouts-img"
                  />
                </td>
                <td class="text-start">{{ item.product.title }}</td>
                <td class="text-end">{{ item.qty }}</td>
                <td class="text-end">{{ $filters.currency(item.final_total) }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th colspan="3" class="text-end">總計</th>
                <th class="text-end">{{ $filters.currency(order.total) }}</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>

    <!-- customer info -->
    <div class="card">
      <div class="card-header text-center bg-warning">
        <h5 class="card-title my-2">顧客資訊</h5>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table align-middle text-nowrap">
            <tbody>
              <tr>
                <th scope="row" class="text-center" width="50%">姓名</th>
                <td>{{ order.user.name }}</td>
              </tr>
              <tr>
                <th scope="row" class="text-center">聯絡電話</th>
                <td>{{ order.user.tel }}</td>
              </tr>
              <tr>
                <th scope="row" class="text-center">聯絡信箱</th>
                <td>{{ order.user.email }}</td>
              </tr>
              <tr>
                <th scope="row" class="text-center">送餐地址</th>
                <td>{{ order.user.address }}</td>
              </tr>
              <tr>
                <th scope="row" class="text-center">結帳方式</th>
                <td>{{ order.user.payment }}</td>
              </tr>
              <tr>
                <th scope="row" class="text-center">特殊備註</th>
                <td>{{ order.message }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="text-end mt-3">
      <router-link to="/" class="btn btn-outline-secondary">取消訂單</router-link>
      <button @click="checkouts" type="button" class="btn btn-outline-primary white-text-btn ms-2">
        確認付款
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomerCheckouts',
  data() {
    return {
      order: {
        user: {},
      },
    };
  },
  methods: {
    getOrders() {
      const vm = this;
      const id = vm.$route.params.orderId;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${id}`;
      vm.$store.dispatch('updateLoading', true);
      vm.$http.get(api)
        .then((response) => {
          if (response.data.order) {
            vm.order = response.data.order;
          } else {
            vm.$router.push('/');
          }
        })
        .catch(() => {
          vm.$store.dispatch('alertModules/updateMessage', {
            message: '資料取得失敗，請確認api是否正確',
            status: false,
          });
        });
      vm.$store.dispatch('updateLoading', false);
    },
    checkouts() {
      const vm = this;
      const id = vm.$route.params.orderId;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${id}`;
      vm.$http.post(api)
        .then((response) => {
          if (response.data.success) {
            vm.$router.push('/order_complete');
          } else {
            vm.$router.push('/');
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
  created() {
    this.getOrders();
  },
};
</script>
