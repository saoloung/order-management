<script setup>
import { reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useOrderStore } from '../stores/order'
import Table from '../components/Table.vue'

const orderStore = useOrderStore()
const isLoading = ref(false)

const orderData = reactive({
    docNo: '',
    customerName: '',
    docStatus: 'Open',
    products: [{
        name: '',
        description: '',
        imageUrl: 'https://picsum.photos/200',
        quantity: 0,
        price: 0
    }],
    shipments: [{
        name: '',
        quantity: 0
    }]
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

const createOrder = async (orderData) => {
    isLoading.value = true
    await orderStore.createOrder(orderData)
    orderData.id = orderStore.selectedOrder.id
    isLoading.value = false
    alert('create order complete')
}

</script>

<template>
    <div>
        Create Order View
        <RouterLink :to="{ name: 'order-list' }">Back</RouterLink>
        <div>
            <h2>Order Header</h2>
            <div v-if="isLoading">
                <h1>Loading...</h1>
            </div>
            <div>
                Order ID:
                {{ orderData.id }}
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
            <button @click="createOrder(orderData)">Create Order</button>
        </div>
        <div>
            <h2>Order Detail</h2>
            <div>
                Product
                <button @click="addProduct()">Add Shipment</button>
            </div>
            <Table :headers="['Name', 'Description', 'Pic', 'Quantity', 'Price', '']">
                <tr v-for="(product, index) in orderData.products">
                    <td> <input type="text" v-model="product.name"> </td>
                    <td> <input type="text" v-model="product.description"> </td>
                    <td> <input type="text" v-model="product.imageUrl"></td>
                    <td> <input type="number" v-model="product.quantity"> </td>
                    <td> <input type="number" v-model="product.price"> </td>
                    <td> <button @click="deleteProduct(index)">Delete</button> </td>
                </tr>
            </Table>
            <div>
                Shipment
                <button @click="addShipment()">Add Shipment</button>
            </div>
            <Table :headers="['Name', 'Description', '']">
                <tr v-for="(shipment, index) in orderData.shipments">
                    <td> <input type="text" v-model="shipment.name"> </td>
                    <td> <input type="number" v-model="shipment.quantity"> </td>
                    <td> <button @click="deleteShipment(index)">Delete</button> </td>
                </tr>
            </Table>
        </div>
    </div>
</template>