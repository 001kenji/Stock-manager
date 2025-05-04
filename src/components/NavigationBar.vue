<template>
    <nav class="bg-agro-green dark:text-white text-slate-900  shadow-lg">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <!-- logo and name -->
          <div class="flex items-center space-x-4">
            <router-link 
              to="/" 
              class="text-xl font-bold hover:text-agro-yellow transition"
            >
              AgroVet Stock
            </router-link>
          </div>
          <!-- desktop navigation links -->
          <div class="hidden md:flex items-center space-x-8">
            <router-link 
              v-for="link in links"
              :key="link.path"
              :to="link.path"
              class="hover:text-amber-500 transition flex items-center space-x-1"
              active-class=" text-amber-500  font-medium"
            >
              <span class=" cursor-pointer" >{{ link.name }}</span>
            </router-link>
          </div>
          
          <div class="md:hidden">
            <button @click="isOpen = !isOpen" class="p-2 focus:outline-none">
              <svg class="w-6 h-6 cursor-pointer " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="!isOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Mobile menu nav -->
        <div v-if="isOpen" class="md:hidden pb-4">
          <router-link 
            v-for="link in links"
            :key="link.path"
            :to="link.path"
            class="block px-3 py-2 hover:bg-green-700 cursor-pointer rounded"
            active-class="bg-green-700"
            @click="isOpen = false"
          >
            {{ link.name }}
          </router-link>
        </div>

      </div>
    </nav>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isOpen: false,
        links: [
          { name: 'Dashboard', path: '/' },
          { name: 'Stock Management', path: '/stock' },
          { name: 'Sales Tracking', path: '/sales' }
        ]
      }
    }
  }
  </script>
  
  <style scoped>
  .router-link-active {
    position: relative;
  }
  
  .router-link-active:after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #f5e625;
  }
  
  @media (max-width: 767px) {
    .router-link-active:after {
      display: none;
    }
  }
  </style>