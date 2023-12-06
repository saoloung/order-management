<script setup>
import { onMounted, ref, reactive } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useOrderStore } from '../stores/order'

const orderStore = useOrderStore()
const route = useRoute()

const orderId = ref(-1)
const orderData = reactive({})
const isLoading = ref(false)

onMounted(async () => {
  isLoading.value = true
  orderId.value = parseInt(route.params.id)
  await orderStore.loadOrder(orderId.value)

  orderData.docNo = orderStore.selectedOrder.docNo
  orderData.customerName = orderStore.selectedOrder.customerName
  orderData.docStatus = orderStore.selectedOrder.docStatus
  orderData.products = orderStore.selectedOrder.products
  orderData.shipments = orderStore.selectedOrder.shipments
  isLoading.value = false
})

const addProduct = () => {
  let pLine = {
    name: '',
    description: '',
    imageUrl: 'https://picsum.photos/200',
    quantity: 0,
    price: 0
  }
  orderData.products.push(pLine)
}

const deleteProduct = (index) => {
    orderData.products.splice(index, 1)
}

const addShipment = () => {
  let sLine = {
    name: '',
    quantity: 0
  }
  orderData.shipments.push(sLine)
}

const deleteShipment = (index) => {
    orderData.shipments.splice(index, 1)
}

const editOrder = async (orderData, orderId) => {
  isLoading.value = true
  await orderStore.editOrder(orderData, orderId)
  isLoading.value = false
  alert('update completed')
}

</script>

<template>
  <div>
    Order Edit View
    <RouterLink :to="{ name: 'order-list' }">Back</RouterLink>
    <div>
      <h2>Order Header</h2>
      <div v-if="isLoading">
        <h1>Loading...</h1>
      </div>
      <div>
        Order ID:
        {{ orderId }}
      </div>
      <div>
        Order no.:
        <input type="text" v-model="orderData.docNo">
      </div>
      <div>
        Customer name:
        <input type="text" v-model="orderData.customerName">
      </div>
      <div>
        Doc Status:
        <select v-model="orderData.docStatus">
          <option v-for="status in orderStore.statuses" :value="status">
            {{ status }}
          </option>
        </select>
      </div>
      <button @click="editOrder(orderData, orderId)">Update</button>
    </div>
    <div>
      <h2>Order Detail</h2>
      <div>
        <table>
          <thead>Product
            <button @click="addProduct()">Add Product</button>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Pic</th>
              <th>Quantity</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in orderData.products">
              <td> <input type="text" v-model="product.name"> </td>
              <td> <input type="text" v-model="product.description"> </td>
              <td> <img :src="product.imageUrl"></td>
              <td> <input type="text" v-model="product.quantity"> </td>
              <td> <input type="text" v-model="product.price"> </td>
              <td> <button @click="deleteProduct(index)">Delete</button> </td>
            </tr>
          </tbody>
        </table>
        <table>
          <thead>Shipment
            <button @click="addShipment()">Add Shipment</button>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(shipment, index) in orderData.shipments">
              <td> <input type="text" v-model="shipment.name"> </td>
              <td> <input type="text" v-model="shipment.quantity"> </td>
              <td> <button @click="deleteShipment(index)">Delete</button> </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
