<template>
  <div>
    <button
      class="btn btn-outline-potatoText w-100 mb-3"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#collapseExample"
      aria-controls="collapseExample"
      :aria-expanded="isExpanded"
      @click="isExpanded = !isExpanded"
    >
      {{ isExpanded ? '隱藏訂單資訊' : '顯示訂單資訊' }}
    </button>
    <div class="collapse mb-3" id="collapseExample">
      <div class="card card-body">
        <div class="table-responsive">
          <table class="table align-middle text-nowrap">
            <thead>
              <tr>
                <th colspan="2" scope="col">商品名稱</th>
                <th scope="col" class="text-end">單價</th>
                <th scope="col" class="text-end" width="100">數量</th>
                <th scope="col" class="text-end">總價</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cart.carts" :key="item.id">
                <td scope="row">
                  <img
                    :src="item.product.imageUrl"
                    :alt="item.product.title"
                    class="checkouts-img"
                  />
                </td>
                <td>{{ item.product.title }}</td>
                <td class="text-end">{{ $filters.currency(item.product.price) }}</td>
                <td class="text-end">{{ item.qty }}</td>
                <td class="text-end">{{ $filters.currency(item.qty * item.product.price) }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr v-if="couponData.status">
                <th scope="row" class="text-end">
                  <div class="me-3">優惠券：</div>
                </th>
                <td colspan="3">
                  <div class="form-control form-control-sm text-center border-success">
                    {{ couponData.code }}
                  </div>
                </td>
                <td class="text-end">
                  <div class="btn btn-success disabled">已套用優惠</div>
                </td>
              </tr>
              <tr class="fw-bold text-end">
                <td scope="row" colspan="3">共有 {{ totalQuantity }} 樣商品</td>
                <td>合計</td>
                <td>
                  <del v-if="couponData.status">{{ $filters.currency(cart.total) }}</del>
                  <span v-else>{{ $filters.currency(cart.total) }}</span>
                </td>
              </tr>
              <tr v-if="couponData.status" class="text-danger text-end fw-bold">
                <td scope="row" colspan="4">折扣後</td>
                <td>{{ $filters.currency(cart.final_total) }}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
    <Form @submit="order" v-slot="{ meta }" class="row g-3">
      <div class="col-md-6 mb-3">
        <div class="card h-100">
          <div class="card-header text-center bg-warning">
            <h5 class="card-title my-2">顧客資訊</h5>
          </div>
          <div class="card-body p-4">
            <div v-for="{ name, label, rules, type } in userInfo" :key="name" class="mb-3">
              <label :for="name" class="form-label w-100"
                >{{ label }}
                <Field
                  :id="name"
                  :name="name"
                  :rules="rules"
                  v-slot="{ field, errorMessage, meta }"
                >
                  <input
                    v-bind="field"
                    :type="type"
                    class="form-control"
                    :class="{ 'is-valid': meta.valid, 'is-invalid': errorMessage }"
                  />
                  <span v-if="errorMessage && meta.touched" class="text-danger fa-sm">
                    {{ errorMessage }}
                  </span>
                </Field>
              </label>
            </div>
            <label for="message" class="form-label w-100"
              >留言
              <Field id="message" name="message" v-slot="{ field }">
                <input v-bind="field" type="text" class="form-control" />
              </Field>
            </label>
          </div>
        </div>
      </div>
      <div class="col-md-6 mb-3">
        <div class="card h-100">
          <div class="card-header text-center bg-warning">
            <h5 class="card-title my-2">外送資訊</h5>
          </div>
          <div class="card-body p-4">
            <div v-for="{ name, label, rules, type } in detailAddress" :key="name" class="mb-3">
              <label :for="name" class="form-label w-100"
                >{{ label }}
                <Field
                  :id="name"
                  :name="name"
                  :rules="rules"
                  v-slot="{ field, errorMessage, meta }"
                >
                  <input
                    v-bind="field"
                    :type="type"
                    class="form-control"
                    :class="{ 'is-valid': meta.valid, 'is-invalid': errorMessage }"
                  />
                </Field>
              </label>
            </div>
            <label for="community" class="form-label w-100"
              >大樓 / 社區名稱
              <Field id="community" name="community" v-slot="{ field }">
                <input v-bind="field" type="text" class="form-control" />
              </Field>
            </label>
            <div class="form-check-label mb-3">
              *付款方式
              <div class="mt-2">
                <Field
                  name="payment"
                  type="radio"
                  value="現金"
                  rules="required"
                  class="form-check-input ms-3"
                />
                現金
                <Field
                  name="payment"
                  type="radio"
                  value="信用卡"
                  rules="required"
                  class="form-check-input ms-3"
                />
                信用卡
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="text-end">
        <router-link to="/check_cart" class="btn btn-outline-secondary">返回購物車</router-link>
        <button
          :disabled="!meta.valid"
          :class="{ 'disabled-btn': !meta.valid }"
          type="submit"
          class="btn btn-outline-primary white-text-btn ms-2"
        >
          確認
        </button>
      </div>
    </Form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'CustomerInfo',
  data() {
    return {
      userInfo: [
        {
          label: '*姓名',
          name: 'name',
          as: 'input',
          rules: 'required',
        },
        {
          label: '*信箱',
          name: 'email',
          as: 'input',
          rules: 'required|email',
        },
        {
          label: '*電話',
          name: 'tel',
          as: 'input',
          type: 'tel',
          rules: 'required',
        },
      ],
      detailAddress: [
        {
          label: '*縣 / 市區',
          name: 'city',
          as: 'input',
          rules: 'required',
        },
        {
          label: '*地址',
          name: 'address',
          as: 'input',
          rules: 'required',
        },
      ],
      payment: '',
      isExpanded: false,
    };
  },
  methods: {
    ...mapActions('cartsModules', ['getCart']),
    order(values) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      const userInfo = {
        user: {
          name: values.name,
          email: values.email,
          tel: values.tel,
          payment: values.payment,
          address: `${values.city}${values.address}`,
          community: values.community,
        },
        message: values.message,
      };
      vm.$http
        .post(api, { data: userInfo })
        .then((response) => {
          vm.$store.dispatch('alertModules/updateMessage', {
            message: response.data.message,
            status: response.data.success,
          });
          if (response.data.success) {
            const path = response.data.orderId;
            vm.getCart();
            vm.$router.push(`/checkouts/${path}`);
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
