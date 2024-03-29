import { createRouter, createWebHashHistory } from 'vue-router';
import axios from 'axios';

const routes = [
  {
    path: '/',
    name: 'CustomerIndex',
    component: () => import('@/views/CustomerIndex.vue'),
    children: [
      {
        path: '',
        name: 'CustomerHome',
        component: () => import('@/views/customer/CustomerHome.vue'),
      },
      {
        path: 'login',
        name: 'LoginPage',
        component: () => import('@/views/customer/LoginPage.vue'),
      },
      {
        path: 'signup',
        name: 'SignupPage',
        component: () => import('@/views/customer/SignupPage.vue'),
      },
      {
        path: 'product_list/:productCategory',
        name: 'ProductList',
        component: () => import('@/views/customer/ProductList.vue'),
      },
      {
        path: 'favorite',
        name: 'FavoriteProduct',
        component: () => import('@/views/customer/FavoriteProduct.vue'),
      },
      {
        path: 'product_page/:productId',
        name: 'ProductPage',
        component: () => import('@/views/customer/ProductPage.vue'),
      },
      {
        path: 'check_cart',
        name: 'CustomerOrder',
        component: () => import('@/views/customer/CustomerOrder.vue'),
        children: [
          {
            path: '',
            name: 'CheckCart',
            component: () => import('@/views/customer/orderPage/CheckCart.vue'),
          },
          {
            path: '/customer_info',
            name: 'CustomerInfo',
            component: () => import('@/views/customer/orderPage/CustomerInfo.vue'),
          },
          {
            path: '/checkouts/:orderId',
            name: 'CustomerCheckouts',
            component: () => import('@/views/customer/orderPage/CustomerCheckouts.vue'),
          },
          {
            path: '/order_complete',
            name: 'OrderComplete',
            component: () => import('@/views/customer/orderPage/OrderComplete.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: () => import('@/views/AdminDashboard.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'products',
        name: 'AdminProducts',
        component: () => import('@/views/dashboard/AdminProducts.vue'),
      },
      {
        path: 'orders',
        name: 'AdminOrders',
        component: () => import('@/views/dashboard/AdminOrders.vue'),
      },
      {
        path: 'coupons',
        name: 'AdminCoupons',
        component: () => import('@/views/dashboard/AdminCoupons.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'CustomerHome' },
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;
    axios.post(api)
      .then((response) => {
        if (response.data.success) {
          next();
        } else {
          next({
            path: '/login',
          });
        }
      })
      .catch(() => {
        next({
          path: '/',
        });
      });
  } else {
    next();
  }
});

export default router;
