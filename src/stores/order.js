import { defineStore } from 'pinia'
import axios from 'axios'

const BASE_URL = 'https://655da7e89f1e1093c599a5aa.mockapi.io'

export const useOrderStore = defineStore('order', {
  state: () => ({
    list: [],
    selectedOrder: {},
    statuses: ['Open', 'Completed']
  }),
  actions: {
    async loadOrders() {
      try {
        const response = await axios.get(`${BASE_URL}/orders`)
        this.list = response.data
        console.log('load order list complete')
      } catch (error) {
        console.log('error', error)
      }
    },
    async loadOrder(id) {
      try {
        const response = await axios.get(`${BASE_URL}/orders/${id}`)
        this.selectedOrder = response.data
        console.log('load order by id complete')
      } catch (error) {
        console.log('error', error)
      }
    },
    async createOrder(orderData) {
      try {
        const response = await axios.post(`${BASE_URL}/orders`, orderData)
        console.log('add order complete')
      } catch (error) {
        console.log('error', error)
      }
    },
    async editOrder(orderData, id) {
      try {
        const response = await axios.put(`${BASE_URL}/orders/${id}`, orderData)
        console.log('edit order complete')
      } catch (error) {
        console.log('error', error)
      }
    },
    async deleteOrder(id) {
      try {
        const response = await axios.delete(`${BASE_URL}/orders/${id}`)
        console.log('delete order complete')
      } catch (error) {
        console.log('error', error)
      }
    }
  }
})
