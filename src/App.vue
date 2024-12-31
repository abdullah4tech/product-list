<script lang="ts" setup>
import { reactive, ref } from 'vue';



const cart = reactive({
  cartCollections: [] as { name: string; price: number; }[],
});
const isLoaded = ref(false)

const data = [
    {
       "image": {
            "thumbnail": "./src/assets/images/image-waffle-thumbnail.jpg",
            "mobile": "./src/assets/images/image-waffle-mobile.jpg",
            "tablet": "./src/assets/images/image-waffle-tablet.jpg",
            "desktop": "./src/assets/images/image-waffle-desktop.jpg"
       },
       "name": "Waffle with Berries",
       "category": "Waffle",
       "price": 6.50
    },
    {
        "image": {
            "thumbnail": "./src/assets/images/image-creme-brulee-thumbnail.jpg",
            "mobile": "./src/assets/images/image-creme-brulee-mobile.jpg",
            "tablet": "./src/assets/images/image-creme-brulee-tablet.jpg",
            "desktop": "./src/assets/images/image-creme-brulee-desktop.jpg"
        },
        "name": "Vanilla Bean Crème Brûlée",
        "category": "Crème Brûlée",
        "price": 7.00
     },
     {
        "image": {
            "thumbnail": "./src/assets/images/image-macaron-thumbnail.jpg",
            "mobile": "./src/assets/images/image-macaron-mobile.jpg",
            "tablet": "./src/assets/images/image-macaron-tablet.jpg",
            "desktop": "./src/assets/images/image-macaron-desktop.jpg"
        },
        "name": "Macaron Mix of Five",
        "category": "Macaron",
        "price": 8.00
     },
     {
        "image": {
            "thumbnail": "./src/assets/images/image-tiramisu-thumbnail.jpg",
            "mobile": "./src/assets/images/image-tiramisu-mobile.jpg",
            "tablet": "./src/assets/images/image-tiramisu-tablet.jpg",
            "desktop": "./src/assets/images/image-tiramisu-desktop.jpg"
        },
        "name": "Classic Tiramisu",
        "category": "Tiramisu",
        "price": 5.50
     },
     {
        "image": {
            "thumbnail": "./src/assets/images/image-baklava-thumbnail.jpg",
            "mobile": "./src/assets/images/image-baklava-mobile.jpg",
            "tablet": "./src/assets/images/image-baklava-tablet.jpg",
            "desktop": "./src/assets/images/image-baklava-desktop.jpg"
        },
        "name": "Pistachio Baklava",
        "category": "Baklava",
        "price": 4.00
     },
     {
        "image": {
            "thumbnail": "./src/assets/images/image-meringue-thumbnail.jpg",
            "mobile": "./src/assets/images/image-meringue-mobile.jpg",
            "tablet": "./src/assets/images/image-meringue-tablet.jpg",
            "desktop": "./src/assets/images/image-meringue-desktop.jpg"
        },
        "name": "Lemon Meringue Pie",
        "category": "Pie",
        "price": 5.00
     },
     {
        "image": {
            "thumbnail": "./src/assets/images/image-cake-thumbnail.jpg",
            "mobile": "./src/assets/images/image-cake-mobile.jpg",
            "tablet": "./src/assets/images/image-cake-tablet.jpg",
            "desktop": "./src/assets/images/image-cake-desktop.jpg"
        },
        "name": "Red Velvet Cake",
        "category": "Cake",
        "price": 4.50
     },
     {
        "image": {
            "thumbnail": "./src/assets/images/image-brownie-thumbnail.jpg",
            "mobile": "./src/assets/images/image-brownie-mobile.jpg",
            "tablet": "./src/assets/images/image-brownie-tablet.jpg",
            "desktop": "./src/assets/images/image-brownie-desktop.jpg"
        },
        "name": "Salted Caramel Brownie",
        "category": "Brownie",
        "price": 4.50
     },
     {
        "image": {
            "thumbnail": "./src/assets/images/image-panna-cotta-thumbnail.jpg",
            "mobile": "./src/assets/images/image-panna-cotta-mobile.jpg",
            "tablet": "./src/assets/images/image-panna-cotta-tablet.jpg",
            "desktop": "./src/assets/images/image-panna-cotta-desktop.jpg"
        },
        "name": "Vanilla Panna Cotta",
        "category": "Panna Cotta",
        "price": 6.50
     }
]

const onImageLoad = () => {
  setInterval(() => {
    isLoaded.value = true
  }, 1000)
}

const isInCart = (item) => {
  return cart.cartCollections.some(
    (cartItem) => cartItem.name === item.name && cartItem.price === item.price
  );
};

const addCart = (item) => {
  // Check if an item with the same name and price already exists
  const exists = isInCart(item);
  if (!exists) {
    item.count = 1; // Initialize count for the item
    cart.cartCollections.unshift(item); // Add the item to the array
  }
};


const removeItem = (item) => {
  const cartItem = cart.cartCollections.find(
    (cartItem) => cartItem.name === item.name && cartItem.price === item.price
  );
  if (cartItem && cartItem.count > 1) {
    cartItem.count--;
  } else if (cartItem && cartItem.count === 1) {
    const index = cart.cartCollections.findIndex(
      (cartItem) => cartItem.name === item.name && cartItem.price === item.price
    );
    cart.cartCollections.splice(index, 1);
  }
}

const removeItemCart = (item) => {
  const exists = cart.cartCollections.findIndex(
    (cartItem) => cartItem.name === item.name && cartItem.price === item.price
  )

  if (exists) {
    cart.cartCollections.splice(exists, 1);
  }
}

const getItemCount = (item) => {
  const cartItem = cart.cartCollections.find(
    (cartItem) => cartItem.name === item.name && cartItem.price === item.price
  );
  return cartItem ? cartItem.count : 0;
};

const addMoreItem = (item) => {
  const cartItem = cart.cartCollections.find(
    (cartItem) => cartItem.name === item.name && cartItem.price === item.price
  );
  if (cartItem) {
    cartItem.count++; // Increase the count of the item
  }
};


</script>


<template>
  <section class="p-6 sm:p-12 flex flex-col md:flex-row md:justify-between gap-8">
    <!-- Desserts Section -->
    <div class="flex flex-col gap-7 w-full md:w-3/4">
      <h1 class="font-bold text-2xl sm:text-3xl">Desserts</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        <div v-for="(i, index) in data" :key="index" class="relative group flex flex-col p-2 gap-4">
          <div
            class="relative">
            <img
              :class="{'blur-sm': !isLoaded, 'border-2': isInCart(i)}"
              class="rounded-xl w-full border-redish object-cover transition duration-500 ease-in-out"
              :src="i.image.mobile"
              @load="onImageLoad"
              :srcset="`${i.image.mobile} 480w, ${i.image.tablet} 768w, ${i.image.desktop} 1024w`"
              :sizes="`(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw`"
              :alt="i.category"
            />

            <!-- Conditional Add/Remove Cart Button -->
            <div
              v-if="!isInCart(i)"
              class="absolute flex -bottom-4 left-1/2 transform -translate-x-1/2 w-32 items-center justify-center bg-white border-[1.5px] opacity-100 p-2 rounded-full shadow-lg cursor-pointer select-none"
              @click="addCart({ name: i.name, price: i.price })"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20" class="mr-2 size-4">
                <g fill="#C73B0F" clip-path="url(#a)">
                  <path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/>
                  <path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/>
                </g>
                <defs>
                  <clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z"/></clipPath>
                </defs>
              </svg>
              <p class="text-xs font-medium">Add to Cart</p>
            </div>

            <div
              v-else
              class="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 flex items-center gap-3 justify-around bg-redish opacity-100 p-2 rounded-full shadow-lg cursor-pointer select-none"
            >
              <div @click="removeItem(i)" class="w-4 h-4 flex items-center justify-center rounded-full border border-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2">
                  <path fill="#fff" d="M0 .375h10v1.25H0V.375Z"/>
                </svg>
              </div>
              <span class="text-white">{{ getItemCount(i) }}</span>
              <div @click="addMoreItem(i)" class="w-4 h-4 flex items-center justify-center rounded-full border border-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10">
                  <path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/>
                </svg>
              </div>
            </div>
          </div>
          <div>
            <span class="text-gray-700 text-xs font-light">{{ i.category }}</span>
            <p class="font-medium text-sm">{{ i.name }}</p>
            <span class="redish font-medium text-sm text-red">
              ${{ i.price.toFixed(2) }}
            </span>
          </div>
        </div>
      </div>

    </div>
    <!-- Cart Section -->
    <div
      class="cart-section bg-gray-100 w-full md:w-1/4 rounded-xl p-6 flex flex-col gap-4 shadow-lg"
    >
      <h2 class="redish font-bold text-left text-lg sm:text-xl">Your Cart ({{ cart.cartCollections.length }})</h2>
      <div v-show="cart.cartCollections.length === 0" class="flex flex-col items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" fill="none" viewBox="0 0 128 128"><path fill="#260F08" d="M8.436 110.406c0 1.061 4.636 2.079 12.887 2.829 8.252.75 19.444 1.171 31.113 1.171 11.67 0 22.861-.421 31.113-1.171 8.251-.75 12.887-1.768 12.887-2.829 0-1.061-4.636-2.078-12.887-2.828-8.252-.75-19.443-1.172-31.113-1.172-11.67 0-22.861.422-31.113 1.172-8.251.75-12.887 1.767-12.887 2.828Z" opacity=".15"/><path fill="#87635A" d="m119.983 24.22-47.147 5.76 4.32 35.36 44.773-5.467a2.377 2.377 0 0 0 2.017-1.734c.083-.304.104-.62.063-.933l-4.026-32.986Z"/><path fill="#AD8A85" d="m74.561 44.142 47.147-5.754 1.435 11.778-47.142 5.758-1.44-11.782Z"/><path fill="#CAAFA7" d="M85.636 36.78a2.4 2.4 0 0 0-2.667-2.054 2.375 2.375 0 0 0-2.053 2.667l.293 2.347a3.574 3.574 0 0 1-7.066.88l-1.307-10.667 14.48-16.88c19.253-.693 34.133 3.6 35.013 10.8l1.28 10.533a1.172 1.172 0 0 1-1.333 1.307 4.696 4.696 0 0 1-3.787-4.08 2.378 2.378 0 1 0-4.72.587l.294 2.346a2.389 2.389 0 0 1-.484 1.755 2.387 2.387 0 0 1-1.583.899 2.383 2.383 0 0 1-1.755-.484 2.378 2.378 0 0 1-.898-1.583 2.371 2.371 0 0 0-1.716-2.008 2.374 2.374 0 0 0-2.511.817 2.374 2.374 0 0 0-.493 1.751l.293 2.373a4.753 4.753 0 0 1-7.652 4.317 4.755 4.755 0 0 1-1.788-3.17l-.427-3.547a2.346 2.346 0 0 0-2.666-2.053 2.4 2.4 0 0 0-2.08 2.667l.16 1.173a2.378 2.378 0 1 1-4.72.587l-.107-1.28Z"/><path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width=".974" d="m81.076 28.966 34.187-4.16"/><path fill="#87635A" d="M7.45 51.793c-.96 8.48 16.746 17.44 39.466 19.947 22.72 2.506 42.08-2.16 43.04-10.667l-3.947 35.493c-.96 8.48-20.24 13.334-43.04 10.667S2.463 95.74 3.423 87.18l4.026-35.387Z"/><path fill="#AD8A85" d="M5.823 65.953c-.96 8.453 16.746 17.44 39.573 20.027 22.827 2.586 42.053-2.187 43.013-10.667L87.076 87.1c-.96 8.48-20.24 13.333-43.04 10.666C21.236 95.1 3.53 86.22 4.49 77.74l1.334-11.787Z"/><path fill="#CAAFA7" d="M60.836 42.78a119.963 119.963 0 0 0-10.347-1.627c-24-2.667-44.453 1.893-45.333 10.373l-2.133 18.88a3.556 3.556 0 1 0 7.066.8 3.574 3.574 0 1 1 7.094.8l-.8 7.094a5.93 5.93 0 1 0 11.786 1.333 3.556 3.556 0 0 1 7.067.8l-.267 2.347a3.573 3.573 0 0 0 7.094.826l.133-1.2a5.932 5.932 0 1 1 11.787 1.36l-.4 3.52a3.573 3.573 0 0 0 7.093.827l.933-8.267a1.174 1.174 0 0 1 1.307-.906 1.146 1.146 0 0 1 1.04 1.306 5.947 5.947 0 0 0 11.813 1.334l.534-4.72a3.556 3.556 0 0 1 7.066.8 3.573 3.573 0 0 0 7.094.826l1.786-15.546a2.373 2.373 0 0 0-2.08-2.667L44.143 55.74l16.693-12.96Z"/><path fill="#87635A" d="m59.156 57.66 1.68-14.88-16.827 13.173 15.147 1.707Z"/><path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width=".974" d="M9.796 52.06c-.667 5.866 16.24 12.586 37.733 15.04 14.774 1.68 27.867.906 34.854-1.654"/></svg>
        <p v-show="cart.cartCollections.length === 0" class="text-gray-500 text-center text-sm">Your cart is empty.</p>
      </div>
      <div>
        <div v-for="(i, index) in cart.cartCollections" :key="index" class="flex border-b mb-3 pb-4 items-center justify-between gap-4">
          <div class="flex flex-col">
            <span class="whitespace-nowrap text-sm font-semibold">{{ i.name }}</span>
            <div class="flex gap-2 text-sm font-semibold">
              <span class="text-redish space-x-4">{{ i.count }}x</span>
              <span class="text-slate-500 font-medium">@${{ i.price }}</span>
              <span>${{ i.price * i.count }}</span>
            </div>
          </div>
          <div @click="removeItemCart(i)" class="w-5 h-5 flex cursor-pointer items-center justify-center rounded-full border-2 p-1 border-rose-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10">
              <path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

.redish {
  color: hsl(14, 86%, 42%);
}

.cart-section {
  overflow-y: auto;
  border-radius: 8px;
  background-color: #fff;
}


</style>
