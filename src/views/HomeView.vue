<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useOrderStore } from '../stores/order'

const orderStore = useOrderStore()
const isLoading = ref(false)

onMounted(async () => {
  await orderStore.loadOrders()
})

const deleteOrder = async (orderId) => {
  try {
    await orderStore.deleteOrder(orderId)
    await orderStore.loadOrders()
  } catch (error) {
    console.log('error', error)
  }
}

</script>

<template>
  <div>
    <h2>
      Order List View
    </h2>
    <RouterLink :to="{ name: 'order-create' }">
      <button>Create Order</button>
    </RouterLink>
  </div>
  <div>
    <table>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Doc no.</th>
          <th>Customer name</th>
          <th>Doc status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orderStore.list">
          <td>{{ order.id }}</td>
          <td>{{ order.docNo }}</td>
          <td>{{ order.customerName }}</td>
          <td>{{ order.docStatus }}</td>
          <td>
            <RouterLink :to="{ name: 'order-edit', params: { id: order.id } }">
              <button>See detail</button>
            </RouterLink>
            <button @click="deleteOrder(order.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
