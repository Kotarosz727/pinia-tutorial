import { defineStore } from "pinia";

export const useCartStore = defineStore('cartStore', {
    state: () => {
        return {
            cart: []
        }
    },

    getters: {
        count: (state) => state.cart.length,
        isEmpty: (state) => state.count === 0
    },

    actions: {
        addItems(count, item) {
            count = parseInt(count)
            
            for(let i = 0; i < count; i++) {
                item = {...item}
                this.cart.push(item)
            }
        }
    }
});