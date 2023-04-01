<template>
  <div class="customer-navbar">
    <nav class="navbar navbar-expand-md navbar-light fixed-top">
      <h1 class="visually-hidden">Mr.Potato</h1>
      <div class="container-fluid">
        <router-link to="/" tag="a" class="navbar-brand text-potatoText">
          <img
            src="@/assets/images/logo.png"
            alt="logo"
            width="28"
            height="28"
            class="d-inline-block align-text-top"
          />
          Mr.Potato
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link to="/admin/products" tag="a" class="nav-link"
                ><i class="fa-solid fa-user-gear me-1"></i>後台管理
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/product_list/all" tag="a" class="nav-link"
                ><i class="fa-solid fa-utensils me-1"></i>挑選美食
              </router-link>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link position-relative"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                ><i class="fa-solid fa-cart-shopping me-1"></i>購物車
                <span
                  v-if="cart.carts.length"
                  class="position-absolute top-5 start-sm-100
                    translate-middle badge rounded-pill bg-primary"
                >
                  {{ cart.carts.length }}
                </span>
              </a>
              <div
                class="dropdown-menu dropdown-menu-end px-3 mb-3"
                aria-labelledby="navbarDropdown"
              >
                <div class="table-responsive text-end" v-if="cart.carts.length">
                  <table class="table text-nowrap">
                    <thead>
                      <tr>
                        <th scope="col" class="text-center">商品名稱</th>
                        <th scope="col" class="text-end">單價</th>
                        <th scope="col" class="text-end">數量</th>
                        <th scope="col" class="text-end">總價</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in cart.carts" :key="item.id">
                        <td scope="row" class="text-start">
                          <a @click.prevent="removeCart(item.id)" href="#" aria-label="Delete">
                            <i class="fa-solid fa-trash-can"></i>
                          </a>
                          {{ item.product.title }}
                        </td>
                        <td class="text-end">{{ $filters.currency(item.product.price) }}</td>
                        <td class="text-end">{{ item.qty }}</td>
                        <td class="text-end">
                          {{ $filters.currency(item.product.price * item.qty) }}
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <th colspan="3" scope="row" class="text-end">總計</th>
                        <td class="text-end">{{ $filters.currency(cart.total) }}</td>
                      </tr>
                    </tfoot>
                  </table>
                  <router-link
                    to="/check_cart"
                    class="btn btn-sm btn-outline-primary white-text-btn"
                  >
                    前往購物車</router-link
                  >
                </div>

                <div v-else class="d-flex justify-content-between align-items-center">
                  <span>目前購物車是空的!</span>
                  <router-link
                    to="/product_list/all"
                    class="btn btn-sm btn-outline-primary white-text-btn"
                    >挑選美食</router-link
                  >
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'CustomerNavbar',
  methods: {
    removeCart(id) {
      this.$store.dispatch('cartsModules/removeCart', id);
    },
    ...mapActions('cartsModules', ['getCart']),
  },
  computed: {
    ...mapGetters('cartsModules', ['cart']),
  },
  created() {
    this.getCart();
  },
};
</script>
