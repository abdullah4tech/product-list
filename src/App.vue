<script lang="ts" setup>
import { computed, reactive, ref } from 'vue';

// Define CartItem type
type CartItem = {
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
  name: string;
  category: string;
  price: number;
  count: number; // Optional property
};

// Define cart as reactive
const cart = reactive({
  cartCollections: [] as CartItem[],
});

const isLoaded = ref(false);
const isVisible = ref(false);


const data: CartItem[] = [
    {
       "image": {
            "thumbnail": "/assets/image-waffle-thumbnail.jpg",
            "mobile": "/assets/image-waffle-mobile.jpg",
            "tablet": "/assets/image-waffle-tablet.jpg",
            "desktop": "/assets/image-waffle-desktop.jpg"
       },
       "name": "Waffle with Berries",
       "category": "Waffle",
       "price": 6.50,
       "count": 0
    },
    {
        "image": {
            "thumbnail": "/assets/image-creme-brulee-thumbnail.jpg",
            "mobile": "/assets/image-creme-brulee-mobile.jpg",
            "tablet": "/assets/image-creme-brulee-tablet.jpg",
            "desktop": "/assets/image-creme-brulee-desktop.jpg"
        },
        "name": "Vanilla Bean Crème Brûlée",
        "category": "Crème Brûlée",
        "price": 7.00,
        "count": 0
     },
     {
        "image": {
            "thumbnail": "/assets/image-macaron-thumbnail.jpg",
            "mobile": "/assets/image-macaron-mobile.jpg",
            "tablet": "/assets/image-macaron-tablet.jpg",
            "desktop": "/assets/image-macaron-desktop.jpg"
        },
        "name": "Macaron Mix of Five",
        "category": "Macaron",
       "price": 8.00,
        "count": 0
     },
     {
        "image": {
            "thumbnail": "/assets/image-tiramisu-thumbnail.jpg",
            "mobile": "/assets/image-tiramisu-mobile.jpg",
            "tablet": "/assets/image-tiramisu-tablet.jpg",
            "desktop": "/assets/image-tiramisu-desktop.jpg"
        },
        "name": "Classic Tiramisu",
        "category": "Tiramisu",
        "price": 5.50,
        "count": 0
     },
     {
        "image": {
            "thumbnail": "/assets/image-baklava-thumbnail.jpg",
            "mobile": "/assets/image-baklava-mobile.jpg",
            "tablet": "/assets/image-baklava-tablet.jpg",
            "desktop": "/assets/image-baklava-desktop.jpg"
        },
        "name": "Pistachio Baklava",
        "category": "Baklava",
        "price": 4.00,
        "count": 0
     },
     {
        "image": {
            "thumbnail": "/assets/image-meringue-thumbnail.jpg",
            "mobile": "/assets/image-meringue-mobile.jpg",
            "tablet": "/assets/image-meringue-tablet.jpg",
            "desktop": "/assets/image-meringue-desktop.jpg"
        },
        "name": "Lemon Meringue Pie",
        "category": "Pie",
        "price": 5.00,
        "count": 0
     },
     {
        "image": {
            "thumbnail": "/assets/image-cake-thumbnail.jpg",
            "mobile": "/assets/image-cake-mobile.jpg",
            "tablet": "/assets/image-cake-tablet.jpg",
            "desktop": "/assets/image-cake-desktop.jpg"
        },
        "name": "Red Velvet Cake",
        "category": "Cake",
        "price": 4.50,
        "count": 0
     },
     {
        "image": {
            "thumbnail": "/assets/image-brownie-thumbnail.jpg",
            "mobile": "/assets/image-brownie-mobile.jpg",
            "tablet": "/assets/image-brownie-tablet.jpg",
            "desktop": "/assets/image-brownie-desktop.jpg"
        },
        "name": "Salted Caramel Brownie",
        "category": "Brownie",
        "price": 4.50,
        "count": 0
     },
     {
        "image": {
            "thumbnail": "/assets/image-panna-cotta-thumbnail.jpg",
            "mobile": "/assets/image-panna-cotta-mobile.jpg",
            "tablet": "/assets/image-panna-cotta-tablet.jpg",
            "desktop": "/assets/image-panna-cotta-desktop.jpg"
        },
        "name": "Vanilla Panna Cotta",
        "category": "Panna Cotta",
       "price": 6.50,
        "count": 0
     }
];

// Function definitions with proper typing
const onImageLoad = () => {
  setInterval(() => {
    isLoaded.value = true;
  }, 1000);
};

const isInCart = (item: CartItem) => {
  return cart.cartCollections.some(
    (cartItem) =>
      cartItem.name === item.name &&
      cartItem.price === item.price &&
      cartItem.image.thumbnail === item.image.thumbnail
  );
};

const addCart = (item: CartItem) => {
  const exists = isInCart(item);
  if (!exists) {
    item.count = item.count || 1; // Initialize count for the item
    cart.cartCollections.unshift(item); // Add the item to the array
  }
};

const removeItemCart = (item: CartItem) => {
  const exists = cart.cartCollections.findIndex(
    (cartItem) =>
      cartItem.name === item.name &&
      cartItem.price === item.price &&
      cartItem.image.thumbnail === item.image.thumbnail
  );

  if (exists !== -1) {
    cart.cartCollections.splice(exists, 1);
  }
};

const removeItem = (item: CartItem) => {
  const cartItem = cart.cartCollections.find(
    (cartItem) =>
      cartItem.name === item.name &&
      cartItem.price === item.price &&
      cartItem.image.thumbnail === item.image.thumbnail
  );
  if (cartItem && cartItem.count > 1) {
    cartItem.count--;
  } else if (cartItem && cartItem.count === 1) {
    const index = cart.cartCollections.findIndex(
      (cartItem) =>
        cartItem.name === item.name &&
        cartItem.price === item.price &&
        cartItem.image.thumbnail === item.image.thumbnail
    );
    cart.cartCollections.splice(index, 1);
  }
};

const getItemCount = (item: CartItem) => {
  const cartItem = cart.cartCollections.find(
    (cartItem) =>
      cartItem.name === item.name &&
      cartItem.price === item.price &&
      cartItem.image.thumbnail === item.image.thumbnail
  );
  return cartItem ? cartItem.count : 0;
};

const addMoreItem = (item: CartItem) => {
  const cartItem = cart.cartCollections.find(
    (cartItem) => cartItem.name === item.name && cartItem.price === item.price
  );
  if (cartItem) {
    cartItem.count++; // Increase the count of the item
  }
};

const getCartTotal = computed(() => {
  return cart.cartCollections.reduce((acc, item) => acc + item.price * (item.count || 0), 0);
});

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
              @click="addCart({
                        image: {
                          thumbnail: i.image.thumbnail,
                          mobile: i.image.mobile,
                          tablet: i.image.tablet,
                          desktop: i.image.desktop
                        },
                        name: i.name,
                        category: i.category, // Make sure `category` is available
                        price: i.price,
                        count: 1
                      })"
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
    <div>
      <div
        class="cart-section bg-gray-100 md:w-80 rounded-xl p-6 flex flex-col gap-4"
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
                <span>${{ (i.price * i.count).toFixed(2) }}</span>
              </div>
            </div>
            <div @click="removeItemCart(i)" class="w-5 h-5 flex cursor-pointer items-center justify-center rounded-full border-2 p-1 border-rose-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10">
                <path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z" />
              </svg>
            </div>
          </div>
        </div>
        <div v-show="cart.cartCollections.length !== 0" class="flex flex-col gap-5">
          <div class="flex items-center justify-between">
            <p class="text-slate-500 text-sm">Order total</p>
            <p class="font-bold text-xl">${{ getCartTotal.toFixed(2) }}</p>
          </div>
          <div class="flex items-center justify-center rounded-xl bg-body-bg p-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><path fill="#1EA575" d="M8 18.75H6.125V17.5H8V9.729L5.803 8.41l.644-1.072 2.196 1.318a1.256 1.256 0 0 1 .607 1.072V17.5A1.25 1.25 0 0 1 8 18.75Z"/><path fill="#1EA575" d="M14.25 18.75h-1.875a1.25 1.25 0 0 1-1.25-1.25v-6.875h3.75a2.498 2.498 0 0 0 2.488-2.747 2.594 2.594 0 0 0-2.622-2.253h-.99l-.11-.487C13.283 3.56 11.769 2.5 9.875 2.5a3.762 3.762 0 0 0-3.4 2.179l-.194.417-.54-.072A1.876 1.876 0 0 0 5.5 5a2.5 2.5 0 1 0 0 5v1.25a3.75 3.75 0 0 1 0-7.5h.05a5.019 5.019 0 0 1 4.325-2.5c2.3 0 4.182 1.236 4.845 3.125h.02a3.852 3.852 0 0 1 3.868 3.384 3.75 3.75 0 0 1-3.733 4.116h-2.5V17.5h1.875v1.25Z"/></svg>
            <p class="text-xs">This is a <span class="font-semibold">clean-neural</span> delivery</p>
          </div>
          <button @click="isVisible = true" class="bg-redish p-3 text-white font-semibold rounded-full">Confirm Order</button>
        </div>
      </div>
    </div>
  </section>
  <div
    v-if="isVisible"

    class="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50"
  >
    <section class="bg-white rounded-lg shadow-md p-8 md:w-[450px] max-w-md mx-auto text-center">
      <div class="flex mb-4">
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 32.121L13.5 24.6195L15.6195 22.5L21 27.879L32.3775 16.5L34.5 18.6225L21 32.121Z"
            fill="#1EA575"
          />
          <path
            d="M24 3C19.8466 3 15.7865 4.23163 12.333 6.53914C8.8796 8.84665 6.18798 12.1264 4.59854 15.9636C3.0091 19.8009 2.59323 24.0233 3.40352 28.0969C4.21381 32.1705 6.21386 35.9123 9.15077 38.8492C12.0877 41.7861 15.8295 43.7862 19.9031 44.5965C23.9767 45.4068 28.1991 44.9909 32.0364 43.4015C35.8736 41.812 39.1534 39.1204 41.4609 35.667C43.7684 32.2135 45 28.1534 45 24C45 18.4305 42.7875 13.089 38.8493 9.15076C34.911 5.21249 29.5696 3 24 3ZM24 42C20.4399 42 16.9598 40.9443 13.9997 38.9665C11.0397 36.9886 8.73256 34.1774 7.37018 30.8883C6.0078 27.5992 5.65134 23.98 6.34587 20.4884C7.04041 16.9967 8.75474 13.7894 11.2721 11.2721C13.7894 8.75473 16.9967 7.0404 20.4884 6.34587C23.98 5.65133 27.5992 6.00779 30.8883 7.37017C34.1774 8.73255 36.9886 11.0397 38.9665 13.9997C40.9443 16.9598 42 20.4399 42 24C42 28.7739 40.1036 33.3523 36.7279 36.7279C33.3523 40.1036 28.7739 42 24 42Z"
            fill="#1EA575"
          />
        </svg>
      </div>
      <h2 class="md:text-3xl text-2xl text-left font-bold text-gray-800">Order Confirmed</h2>
      <p class="text-left text-xs text-rose-1 mb-3">We hope you enjoy your food!</p>

      <div class="bg-body-bg py-[0.4px] rounded-lg px-4 pb-4 mb-4">
        <div class="mt-6 space-y-4">
          <div
            v-for="(item, index) in cart.cartCollections"
            :key="index"
            class="flex justify-between border-b border-gray-200 items-center"
          >
            <div class="flex text-xs items-center justify-between pb-4">
              <img
                :src="item.image.thumbnail"
                alt="Product image"
                class="w-12 h-12 rounded-lg object-cover"
              />
              <div class="flex-1 ml-4 text-left">
                <p class="font-semibold text-gray-700">{{ item.name }}</p>
                <div class="flex items-center gap-3 text-sm text-gray-500">
                  <span class="text-redish font-semibold">{{ item.count }}x</span>
                  <span>@${{ item.price.toFixed(2) }}</span>
                </div>
              </div>
            </div>
            <p>${{ (item.price * item.count).toFixed(2) }}</p>
          </div>
        </div>

        <div
          class="flex justify-between items-center pt-4 font-semibold text-gray-700"
        >
          <span>Order Total</span>
          <span>${{ getCartTotal.toFixed(2) }}</span>
        </div>
      </div>


      <button @click="isVisible = false" class="bg-redish p-3 text-white w-full font-semibold rounded-full">Start New Order</button>

    </section>
  </div>
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
