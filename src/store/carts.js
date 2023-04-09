import axios from 'axios';

export default {
  namespaced: true,
  state: {
    cart: {
      carts: [],
    },
    couponData: JSON.parse(localStorage.getItem('couponData')) || [],
  },
  actions: {
    getCart(context) {
      context.commit('LOADING', true, { root: true });
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      axios.get(api).then((response) => {
        if (response.data.data.carts.length === 0) {
          context.dispatch('changeCouponStatus', { status: false, code: '' });
        }
        context.commit('CART', response.data.data);
        context.commit('LOADING', false, { root: true });
      });
    },
    removeCart(context, id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      context.commit('LOADING', true, { root: true });
      axios.delete(api).then((response) => {
        context.dispatch('alertModules/updateMessage', { message: response.data.message, status: response.data.success }, { root: true });
        context.dispatch('getCart');
        context.commit('LOADING', false, { root: true });
      });
    },
    addToCart(context, { id, qty }) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      context.commit('LOADING', true, { root: true });
      const item = {
        product_id: id,
        qty,
      };
      axios.post(api, { data: item }).then((response) => {
        context.dispatch('alertModules/updateMessage', { message: response.data.message, status: response.data.success }, { root: true });
        context.dispatch('getCart');
        context.commit('LOADING', false, { root: true });
      });
    },
    updateCart(context, { id, qty, cartId }) {
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${cartId}`;
      axios.delete(api).then((response) => {
        context.dispatch('alertModules/updateMessage', { message: '已更新購物車', status: response.data.success }, { root: true });
        context.dispatch('getCart');
        context.commit('LOADING', false, { root: true });
      });
      if (qty !== 0) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
        context.commit('LOADING', true, { root: true });
        const item = {
          product_id: id,
          qty,
        };
        axios.post(api, { data: item }).then(() => {
          context.dispatch('getCart');
          context.commit('LOADING', false, { root: true });
        });
      }
    },
    changeCouponStatus({ state, commit }, { status, code }) {
      commit('COUPON_DATA', { status, code });
      localStorage.setItem('couponData', JSON.stringify(state.couponData));
    },
  },
  mutations: {
    CART(state, cartData) {
      state.cart = cartData;
    },
    COUPON_DATA(state, couponData) {
      state.couponData = couponData;
    },
  },
  getters: {
    cart: (state) => state.cart,
    couponData: (state) => state.couponData,
  },
  module: {
  },
};
