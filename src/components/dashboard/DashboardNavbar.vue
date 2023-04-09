<template>
  <div class="dashboard-navbar d-lg-none">
    <nav class="navbar navbar-expand-md bg-secondary fixed-top">
      <h1 class="visually-hidden">Mr.Potato - 後台管理</h1>
      <div class="container-fluid">
        <router-link to="/admin/products" tag="a" class="navbar-brand text-warning">
          <img
            src="@/assets/images/logo.png"
            alt="logo"
            width="28"
            height="28"
            class="d-inline-block align-text-top"
          />
          後台管理
        </router-link>
        <button
          class="navbar-toggler border-warning"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" ref="navbarCollapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link to="/" tag="a" class="nav-link"
                ><i class="fa-solid fa-house me-1"></i>首頁
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/admin/products" tag="a" class="nav-link"
                ><i class="fa-solid fa-box-open me-1"></i>產品列表
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/admin/orders" tag="a" class="nav-link"
                ><i class="fa-solid fa-list-check me-1"></i>訂單列表
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/admin/coupons" tag="a" class="nav-link"
                ><i class="fa-solid fa-ticket me-1"></i>優惠券
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/" tag="a" class="nav-link"
                @click.prevent="$emit('sign-out')"
                ><i class="fa-solid fa-arrow-right-from-bracket me-1"></i>登出
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { Collapse } from 'bootstrap';

export default {
  name: 'DashboardNavbar',
  watch: {
    $route() {
      this.navbarCollapse.hide();
    },
  },
  mounted() {
    this.navbarCollapse = new Collapse(this.$refs.navbarCollapse);
  },
};
</script>
