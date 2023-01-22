import { defineStore } from "pinia";
import { sum, groupBy } from "lodash";

export const useCartStore = defineStore('cartStore', {
    state: () => {
        return {
            cart: []
        }
    },

    getters: {
        count: (state) => state.cart.length,
        isEmpty: (state) => state.count === 0,
        groupedByName: (state) => groupBy(state.cart, 'name'),
        groupCount: (state) => (name) => state.groupedByName[name].length,
        totalPrice: (state) => state.cart.reduce((previous, current) => previous + current.price, 0)
    },

    actions: {
        addItems(count, item) {
            count = parseInt(count)
            
            for(let i = 0; i < count; i++) {
                item = {...item}
                this.cart.push(item)
            }
        },
        deleteItem(name) {
            this.cart = this.cart.filter(item => item.name !== name)
        },
    }
});