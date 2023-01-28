<template>
  <div class="container">
    <TheHeader />
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
        console.log(args[0])
      });
    }
  }
);

</script>
