import { defineStore, acceptHMRUpdate } from "pinia";
import { groupBy } from "lodash";
import { useAuthStore } from "./userAuthStore";

export const useCartStore = defineStore('cartStore', {
    state: () => {
        return {
            cart: []
        }
    },

    getters: {
        count: (state) => state.cart.length,
        isEmpty: (state) => state.count === 0,
        groupedByName: (state) => {
            const grouped = groupBy(state.cart, 'name')
            const sorted = Object.keys(grouped).sort()
            let sortedItems = new Object;
            sorted.forEach((key) => sortedItems[key] = grouped[key])
            return sortedItems
        },
        groupCount: (state) => (name) => state.groupedByName[name].length,
        totalPrice: (state) => state.cart.reduce((previous, current) => previous + current.price, 0)
    },

    actions: {
        checkOut() {
            const userStore = useAuthStore();  
            alert(`${userStore.authUser} buy ${this.count} $${this.totalPrice}`)
        },
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
        addCount(item, count) {
            count = parseInt(count)
            this.deleteItem(item.name)
            this.addItems(count, item)
        }
    }
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}