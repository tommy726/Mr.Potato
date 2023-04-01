import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'CustomerIndex',
    component: () => import('@/views/CustomerIndex.vue'),
    children: [
      {
        path: '/',
        name: 'CustomerHome',
        component: () => import('@/views/customer/CustomerHome.vue'),
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/customer/LoginPage.vue'),
      },
      {
        path: '/product_list/:productCategory',
        name: 'List',
        component: () => import('@/views/customer/ProductList.vue'),
      },
      {
        path: '/product_page/:productId',
        name: 'Page',
        component: () => import('@/views/customer/ProductPage.vue'),
      },
      {
        path: '/check_cart',
        name: 'CustomerOrder',
        component: () => import('@/views/customer/CustomerOrder.vue'),
        children: [
          {
            path: '/check_cart',
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
        path: '/admin/products',
        name: 'AdminProducts',
        component: () => import('@/views/dashboard/AdminProducts.vue'),
      },
      {
        path: '/admin/orders',
        name: 'AdminOrders',
        component: () => import('@/views/dashboard/AdminOrders.vue'),
      },
      {
        path: '/admin/coupons',
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
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
