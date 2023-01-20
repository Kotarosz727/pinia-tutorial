import { defineStore } from "pinia";

export const useCartStore = defineStore('cartStore', {
    state: () => {
        return {
            cart: []
        }
    },

    actions: {
        addItems(count, item) {
            count = parseInt(count)
            
            console.log('debug', count, item)
            
            for(let i = 0; i < count; i++) {
                item = {...item}
                this.cart.push(item)
            }
        }
    }
});