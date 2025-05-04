<template>
  <div class="p-4 md:p-8">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <div>
        <h1 class="text-2xl md:text-3xl font-bold text-agro-green">Welcome back, {{ name || 'Admin' }}!</h1>
        <p class="text-gray-600 mt-1">Today is {{ currentDate }}</p>
      </div>
      <div class="mt-4 md:mt-0 bg-agro-green/10 px-4 py-2 rounded-full">
        <span class="text-agro-green font-medium">Last updated: {{ lastUpdatedTime }}</span>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold text-gray-700 mb-2">Total Items</h3>
            <p class="text-3xl font-bold text-agro-green">{{ totalItems }}</p>
          </div>
          <div class="bg-agro-green/10 p-3 rounded-full">
            <svg class="w-6 h-6 text-agro-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
            </svg>
          </div>
        </div>
        <p class="text-sm text-gray-500 mt-3">All products in inventory</p>
      </div>
      
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold text-gray-700 mb-2">Restock Needed</h3>
            <p class="text-3xl font-bold text-red-500">{{ restockItemsCount }}</p>
          </div>
          <div class="bg-red-100 p-3 rounded-full">
            <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
          </div>
        </div>
        <p class="text-sm text-gray-500 mt-3">Items below minimum stock</p>
      </div>
      
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold text-gray-700 mb-2">Weekly Sales</h3>
            <p class="text-3xl font-bold text-agro-yellow">{{ weeklySales }} kg</p>
          </div>
          <div class="bg-yellow-100 p-3 rounded-full">
            <svg class="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
          </div>
        </div>
        <p class="text-sm text-gray-500 mt-3">Total products sold this week</p>
      </div>
    </div>

    <!-- Restock Alerts Section -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-semibold text-gray-800">Restock Alerts</h2>
        <span class="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {{ restockItemsCount }} Urgent
        </span>
      </div>
      
      <div v-if="restockItems.length > 0" class="grid grid-cols-1 max-h-[600px] overflow-y-auto md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StockItem 
          v-for="item in restockItems"
          :key="item.id"
          :item="item"
          @restock="handleRestock"
        />
      </div>
      <div v-else class="text-center py-8">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">All stocked up!</h3>
        <p class="mt-1 text-sm text-gray-500">No items need restocking at this time.</p>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button 
          v-for="action in quickActions"
          :key="action.name"
          @click="handleAction(action.action)"
          class="flex flex-col items-center cursor-pointer justify-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          <div class="bg-agro-green/10 p-3 rounded-full mb-2">
            <component :is="action.icon" class="w-6 h-6 text-agro-green"/>
          </div>
          <span class="text-sm font-medium text-gray-700">{{ action.name }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import StockItem from '../components/StockItem.vue'
import { 
  ArrowPathIcon,
  PlusCircleIcon,
  DocumentChartBarIcon,
  TruckIcon 
} from '@heroicons/vue/24/outline'

export default {
  components: { 
    StockItem,
    ArrowPathIcon,
    PlusCircleIcon,
    DocumentChartBarIcon,
    TruckIcon
  },
  
  data() {
    return {
      currentDate: new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      lastUpdatedTime: new Date().toLocaleTimeString(),
      quickActions: [
        { name: 'Restock', icon: 'TruckIcon', action: 'restock' },
        { name: 'Add Item', icon: 'PlusCircleIcon', action: 'add' },
        { name: 'Refresh', icon: 'ArrowPathIcon', action: 'refresh' },
        { name: 'Reports', icon: 'DocumentChartBarIcon', action: 'reports' }
      ]
    }
  },
  
  computed: {
    ...mapState('stock', ['items']),
    ...mapState('user', ['name']),
    
    restockItems() {
      return this.items.filter(item => item.totalWeight < item.minWeight)
    },
    
    restockItemsCount() {
      return this.restockItems.length
    },
    
    totalItems() {
      return this.items.length
    },
    
    weeklySales() {
      // Implement actual sales calculation from your store
      var sales_array = this.$store.getters['sales/weeklySales']
      var totalkg = 0
      for (let i = 0; i < sales_array.length; i++) {
        totalkg += Number(sales_array[i]['weightSold'])
        
      }
      console.log(totalkg)
      return totalkg || 0
    }
  },
  
  methods: {
    handleRestock(itemId) {
      // Implement restock logic
      this.$store.dispatch('stock/restockItem', itemId)
    },
    
    handleAction(action) {
      switch(action) {
        case 'restock':
          // Navigate to restock page or show modal
          break
        case 'add':
          this.$router.push('/stock/add')
          break
        case 'refresh':
          this.$store.dispatch('stock/loadItems')
          this.lastUpdatedTime = new Date().toLocaleTimeString()
          break
        case 'reports':
          this.$router.push('/reports')
          break
      }
    }
  }
}
</script>