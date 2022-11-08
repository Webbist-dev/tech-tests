<script>
import { ref, getCurrentInstance } from 'vue'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const internalInstance = getCurrentInstance()
    const { feedItBackApi } =
      internalInstance.appContext.config.globalProperties
    const route = useRoute()
    const loadingState = ref(null)
    const user = ref([])
    const orders = ref([])

    const fetchUser = () => {
      Promise.all([
        feedItBackApi.get(import.meta.env.VITE_API_GUESTS, {
          params: {
            id: route.params.id
          }
        }),
        feedItBackApi.get(import.meta.env.VITE_API_ORDERS, {
          params: {
            guest_id: route.params.id,
            limit: 100
          }
        })
      ]).then(([userResponse, ordersResponse]) => {
        loadingState.value = 'success'
        user.value = userResponse.data.items[0]
        orders.value = ordersResponse.data.items
      })
    }

    return {
      loadingState,
      fetchUser,
      user,
      orders
    }
  },
  created() {
    this.fetchUser(0)
  }
}
</script>

<template>
  <section class="row">
    <div class="col-xs-12 col-md-4">
      <h2>{{ user.first_name }} {{ user.last_name }}</h2>
      <div class="detail">
        <strong>Gender:</strong>
        <p>{{ user.gender }}</p>
      </div>
      <div class="detail">
        <strong>Last visited:</strong>
        <p>{{ $filters.formatDate(user.visited) }}</p>
      </div>
      <div class="detail">
        <strong>Email:</strong>
        <a :href="`mailto:${user.email}`">{{ user.email }}</a>
      </div>
    </div>
    <div class="col-xs-12 col-md-8">
      <div class="heading">
        <h2>Orders</h2>

        <div class="row headings">
          <p class="col-xs-6">Order</p>
          <p class="col-xs-3">Price</p>
          <p class="col-xs-3">Quantity</p>
        </div>
      </div>
      <ul class="listing">
        <li v-for="order in orders" :key="order.id" class="row item">
          <p class="col-xs-6">{{ order.name }}</p>
          <p class="col-xs-3">{{ $filters.currency(order.price) }}</p>
          <p class="col-xs-3">{{ order.quantity }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>
