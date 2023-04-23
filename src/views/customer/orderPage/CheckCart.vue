<template>
  <div class="card">
    <div class="card-header text-center bg-warning">
      <h5 class="card-title my-2">確認購物車</h5>
    </div>
    <div class="card-body d-flex flex-column">
      <div class="table-responsive">
        <table class="table align-middle text-nowrap">
          <thead>
            <tr>
              <th colspan="2" scope="col">商品名稱</th>
              <th scope="col" class="text-end">單價</th>
              <th scope="col" class="text-center" width="100">數量</th>
              <th scope="col" class="text-center" width="40">更新</th>
              <th scope="col" class="text-end">總價</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cart.carts" :key="item.id">
              <td scope="row">
                <a @click.prevent="removeCart(item.id)" href="#" aria-label="remove"
                  ><i class="fa-solid fa-trash-can"></i
                ></a>
                <img :src="item.product.imageUrl" :alt="item.product.title" class="checkouts-img" />
              </td>
              <td class="text-start">{{ item.product.title }}</td>
              <td class="text-end">{{ $filters.currency(item.product.price) }}</td>
              <td class="text-center">
                <div class="input-group" role="group" aria-label="quantity input">
                  <input
                    v-model="item.qty"
                    type="number"
                    class="form-control form-control-sm text-center"
                    min="1"
                    aria-label="quantity"
                    aria-describedby="quantity"
                  />
                </div>
              </td>
              <td class="text-center">
                <button
                  @click="updateCart(item.product.id, item.qty, item.id)"
                  type="button"
                  class="btn btn-sm btn-outline-secondary"
                >
                  <i class="fa-solid fa-arrow-rotate-left"></i>
                </button>
              </td>
              <td class="text-end">{{ $filters.currency(item.qty * item.product.price) }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th colspan="5" scope="row" class="text-end">
                <label for="coupon" class="d-flex w-75 align-items-center ms-auto"
                  >優惠券：
                  <input
                    v-model="coupon_code"
                    type="text"
                    class="form-control form-control-sm text-center"
                    id="coupon"
                    placeholder="請輸入優惠碼"
                    :class="{ 'border-success': couponData.status }"
                  />
                </label>
              </th>
              <td class="text-end">
                <button @click="addCouponCode" type="button" class="btn btn-outline-secondary">
                  套用
                </button>
              </td>
            </tr>
            <tr>
              <td scope="row" colspan="4" class="text-end">共有 {{ totalQuantity }} 樣商品</td>
              <td class="text-end fw-bold">總計</td>
              <td class="text-end fw-bold">
                <del v-if="couponData.status">{{ $filters.currency(cart.total) }}</del>
                <span v-else>{{ $filters.currency(cart.total) }}</span>
              </td>
            </tr>
            <tr class="text-danger" v-if="couponData.status">
              <td scope="row" colspan="5" class="text-end fw-bold">折扣後</td>
              <td class="text-end fw-bold">{{ $filters.currency(cart.final_total) }}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <router-link to="/customer_info" class="btn btn-outline-primary ms-auto white-text-btn">
        前往結帳資訊
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'CheckCart',
  data() {
    return {
      coupon_code: '' || JSON.parse(localStorage.getItem('couponData')).code,
    };
  },
  methods: {
    ...mapActions('cartsModules', ['getCart']),
    removeCart(id) {
      this.$store.dispatch('cartsModules/removeCart', id);
    },
    updateCart(id, qty, cartId) {
      const vm = this;
      vm.$store.dispatch('cartsModules/updateCart', { id, qty, cartId });
      if (vm.coupon_code !== '') {
        setTimeout(() => vm.addCouponCode(), 100);
      }
    },
    addCouponCode() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      const coupon = {
        code: vm.coupon_code,
      };
      vm.$http.post(api, { data: coupon })
        .then((response) => {
          if (response.data.success) {
            const status = response.data.success;
            const code = response.data.message.split(':')[1];
            vm.$store.dispatch('cartsModules/changeCouponStatus', { status, code });
          } else {
            vm.coupon_code = '';
          }
          vm.$store.dispatch('alertModules/updateMessage', {
            message: response.data.message,
            status: response.data.success,
          });
          vm.getCart();
        })
        .catch(() => {
          vm.$store.dispatch('alertModules/updateMessage', {
            message: '資料取得失敗，請確認api是否正確',
            status: false,
          });
        });
    },
  },
  computed: {
    ...mapGetters('cartsModules', ['cart']),
    ...mapGetters('cartsModules', ['couponData']),
    totalQuantity() {
      return this.cart.carts.map((item) => item.qty).reduce((total, qty) => total + qty, 0);
    },
  },
  created() {
    this.getCart();
  },
};
</script>
