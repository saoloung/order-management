<script setup>
import { reactive } from 'vue'
import { RouterLink } from 'vue-router'
import { useOrderStore } from '../stores/order'

const orderStore = useOrderStore()
const orderData = reactive({
    docNo: '',
    customerName: '',
    docStatus: 'Open',
    products: [{
        name: '',
        description: '',
        imageUrl: '',
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
        imageUrl: '',
        quantity: 0,
        price: 0
    }     
    orderData.products.push(pLine)
}

const addShipment = () => {
    let sLine = {
        name: '',
        quantity: 0
    }
    orderData.shipments.push(sLine)
}

const createOrder = async (orderData) => {
    await orderStore.createOrder(orderData)
    alert('create order complete')
}

</script>

<template>
    <div>
        Create Order View
        <RouterLink :to="{ name: 'order-list' }">Back</RouterLink>
        <div>
            <h2>Order Header</h2>
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
                <table>
                    <thead>Product
                        <button @click="addProduct()">Add Product</button>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Pic</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in orderData.products">
                            <td> <input type="text" v-model="product.name"> </td>
                            <td> <input type="text" v-model="product.description"> </td>
                            <td> <input type="text" v-model="product.imageUrl"></td>
                            <td> <input type="number" v-model="product.quantity"> </td>
                            <td> <input type="number" v-model="product.price"> </td>
                        </tr>
                    </tbody>
                </table>
                <table>
                    <thead>Shipment
                        <button @click="addShipment()">Add Shipment</button>
                        <tr>
                            <th>Name</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="shipment in orderData.shipments">
                            <td> <input type="text" v-model="shipment.name"> </td>
                            <td> <input type="number" v-model="shipment.quantity"> </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>