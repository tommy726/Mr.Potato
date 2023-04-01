<template>
  <div class="dashboard-sidebar col-lg-3 col-xl-2 bg-potatoText d-none d-lg-block">
    <div class="d-flex flex-column align-items-star py-6 px-3 min-vh-100 sticky-top">
      <router-link to="/admin/products" tag="a" class="text-warning fs-3 mb-3">
        <img
          src="@/assets/images/logo.png"
          alt="logo"
          width="28"
          height="28"
          class="d-inline-block align-text-top"
        />
        後台管理
      </router-link>
      <ul class="nav flex-column mb-0" id="menu">
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
            @click.prevent="$emit('sign-out')">
            <i class="fa-solid fa-arrow-right-from-bracket me-1"></i>登出
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardSidebar',
};
</script>
