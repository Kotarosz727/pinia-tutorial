import { defineStore } from 'pinia'
import productData from '@/data/products.json'

// unique across project
export const useProductStore = defineStore('productStore', {
    state: () => {
        return {
            productData,
        }
    },
  
    // getters: {},

    // actions: {},
});