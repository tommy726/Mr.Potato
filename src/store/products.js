import axios from 'axios';

export default {
  namespaced: true,
  state: {
    filterProducts: [],
    randomProducts: [],
  },
  actions: {
    getProducts(context) {
      context.dispatch('updateLoading', true, { root: true });
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      axios.get(api).then((response) => {
        const filterProducts = response.data.products.filter((item) => item.is_enabled === 1);
        context.commit('FILTER_PRODUCTS', filterProducts);
        context.dispatch('getRandomProduct', filterProducts);
        context.dispatch('updateLoading', false, { root: true });
      });
    },
    getRandomProduct(context, array) {
      let currentIndex = array.length;
      let temporaryValue;
      let randomIndex;
      const newArray = [...array];
      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = newArray[currentIndex];
        newArray[currentIndex] = newArray[randomIndex];
        newArray[randomIndex] = temporaryValue;
      }
      const randomProducts = newArray.slice(0, 3);
      context.commit('RANDOM_PRODUCTS', randomProducts);
    },
  },
  mutations: {
    FILTER_PRODUCTS(state, data) {
      state.filterProducts = data;
    },
    RANDOM_PRODUCTS(state, data) {
      state.randomProducts = data;
    },
  },
  getters: {
    filterProducts: (state) => state.filterProducts,
    randomProducts: (state) => state.randomProducts,
  },
  module: {
  },
};
