import { createStore } from 'vuex';
import cartsModules from './carts';
import alertModules from './alertMessage';
import productsModules from './products';

export default createStore({
  state: {
    isLoading: false,
  },
  actions: {
    updateLoading(context, status) {
      context.commit('LOADING', status);
    },
  },
  mutations: {
    LOADING(state, status) {
      state.isLoading = status;
    },
  },
  getters: {
  },
  modules: {
    cartsModules,
    alertModules,
    productsModules,
  },
});
