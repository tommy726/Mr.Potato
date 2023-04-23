import axios from 'axios';

export default {
  namespaced: true,
  state: {
    filterProducts: [],
    lunchBoxProducts: [],
    saladProducts: [],
    favoriteProducts: JSON.parse(localStorage.getItem('favoriteProducts')) || [],
  },
  actions: {
    getProducts(context) {
      context.dispatch('updateLoading', true, { root: true });
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      axios.get(api)
        .then((response) => {
          const filterProducts = response.data.products.filter((item) => item.is_enabled === 1);
          context.commit('FILTER_PRODUCTS', filterProducts);
          context.dispatch('getLunchBoxProducts');
          context.dispatch('getSaladProducts');
          context.dispatch('updateLoading', false, { root: true });
        })
        .catch(() => {
          context.dispatch('alertModules/updateMessage', {
            message: '資料取得失敗，請確認api是否正確',
            status: false,
          });
        });
    },
    getLunchBoxProducts({ state, commit }) {
      const lunchBoxProducts = state.filterProducts.filter((item) => item.price >= 100);
      commit('LUNCH_BOX_PRODUCTS', lunchBoxProducts);
    },
    getSaladProducts({ state, commit }) {
      const saladProducts = state.filterProducts.filter((item) => item.category === '純素主義');
      commit('SALAD_PRODUCTS', saladProducts);
    },
    addToFavorite({ state, dispatch }, { id, item }) {
      if (!state.favoriteProducts.includes(id)) {
        state.favoriteProducts.push(id, item);
        dispatch('alertModules/updateMessage', { message: '已加入收藏', status: true }, { root: true });
      } else {
        const index = state.favoriteProducts.findIndex((i) => i === id);
        state.favoriteProducts.splice(index, 2);
        dispatch('alertModules/updateMessage', { message: '已從收藏中刪除', status: false }, { root: true });
      }
      localStorage.setItem('favoriteProducts', JSON.stringify(state.favoriteProducts));
    },
  },
  mutations: {
    FILTER_PRODUCTS(state, data) {
      state.filterProducts = data;
    },
    LUNCH_BOX_PRODUCTS(state, data) {
      state.lunchBoxProducts = data;
    },
    SALAD_PRODUCTS(state, data) {
      state.saladProducts = data;
    },
  },
  getters: {
    filterProducts: (state) => state.filterProducts,
    lunchBoxProducts: (state) => state.lunchBoxProducts,
    saladProducts: (state) => state.saladProducts,
    favoriteProducts: (state) => state.favoriteProducts,
  },
  module: {
  },
};
