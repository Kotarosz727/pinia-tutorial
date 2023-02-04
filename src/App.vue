<template>
  <div class="container">
    <TheHeader />
    <div class="flex justify-end">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-5" @click="undo()">
        Undo
      </button>
    </div>
    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <ProductCard
        v-for="product in productStore.products"
        :key="product.name"
        :product="product"
        @addToCart="cartStore.addItems($event, product)"
      />
    </ul>
  </div>
</template>

<script setup>
import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
import { useProductStore } from "./store/productStore";
import { useCartStore } from "./store/cartStore"
import { reactive } from "vue";
const productStore = useProductStore()
productStore.fill()

const cartStore = useCartStore()
cartStore.$onAction(
  ({
    name, // name of the action
    store, // store instance, same as `someStore`
    args, // array of parameters passed to the action
    after, // hook after the action returns or resolves
    onError, // hook if the action throws or rejects
  }) => {
    if (name === 'addItems') {
      after(() => {
        console.log(args[0], args[1])
      });
    }
  }
);
const history = reactive([]);
history.push(JSON.stringify(cartStore.$state))

cartStore.$subscribe((mutaion, state) => {
  console.log('mutation', mutaion)
  history.push(JSON.stringify(state))
  console.log('history', history)
})

const undo = () => {
  if (history.length === 1) return

  history.pop()
  cartStore.$state = JSON.parse(history.at(-1))
}

</script>
