<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useOrderStore } from '../stores/order'
import Table from '../components/Table.vue'

const orderStore = useOrderStore()
const isLoading = ref(false)

onMounted(async () => {
  isLoading.value = true
  await orderStore.loadOrders()
  isLoading.value = false
})

const deleteOrder = async (orderId) => {
  isLoading.value = true
  try {
    await orderStore.deleteOrder(orderId)
    await orderStore.loadOrders()
  } catch (error) {
    console.log('error', error)
  }
  isLoading.value = false
}

</script>

<template>
  <div>
    <h2>
      Order List View
    </h2>
    <div v-if="isLoading">
      <h1>Loading...</h1>
    </div>
    <div>
      <RouterLink :to="{ name: 'order-create' }">
        <button>Create Order</button>
      </RouterLink>
    </div>
  </div>
  <div>
    <Table :headers="['Order ID', 'Doc No.', 'Customer Name', 'Doc Status', '']">
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
    </Table>
  </div>
</template>
