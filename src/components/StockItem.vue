<template>
  <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
    <div class="flex justify-between items-start mb-3">
      <div>
        <span class="inline-block px-2 py-1 text-xs font-medium rounded-full mb-2" :class="stockTagClass">
          {{ stockStatus }}
        </span>
        <h3 class="text-lg font-semibold text-gray-800">{{ item.name }}</h3>
      </div>
      <div class="text-right">
        <p class="text-xs hidden text-gray-500">Item ID: {{ item.id }}</p>
      </div>
    </div>

    <div class="flex items-center justify-between mt-4">
      <div>
        <p class="text-sm text-gray-600 mb-1">Current Stock</p>
        <p class="text-xl font-bold text-gray-900">{{ Math.round(item.totalWeight) }}<span class="text-sm font-normal text-gray-500"> kg</span></p>
      </div>

      <div>
        <p class="text-sm text-gray-600 mb-1">Minimum Required</p>
        <p class="text-lg font-medium text-gray-700">{{ item.minWeight }}<span class="text-sm font-normal text-gray-500"> kg</span></p>
      </div>
    </div>

    <!-- Progress bar showing stock level -->
    <div class="mt-4">
      <div class="flex justify-between text-xs text-gray-500 mb-1">
        <span>0 kg (scale)</span>
        <span>{{ item.minWeight * 2 }} kg (safe level)</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          class="h-2.5 rounded-full" 
          :class="stockProgressColor"
          :style="`width: ${stockPercentage}%`"
        ></div>
      </div>
    </div>

    <button 
      class="mt-4 w-full flex items-center cursor-pointer bg-gray-700 justify-center gap-2 bg-agro-green hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
      @click="$emit('restock', item.id)"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
      Restock Item
    </button>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    stockStatus() {
      if (this.item.totalWeight < this.item.minWeight) return 'Need Restock'
      if (this.item.totalWeight < this.item.minWeight * 2) return 'Low Stock'
      return 'Adequate Stock'
    },
    stockTagClass() {
      return {
        'bg-red-100 text-red-800': this.stockStatus === 'Need Restock',
        'bg-yellow-100 text-yellow-800': this.stockStatus === 'Low Stock',
        'bg-green-100 text-green-800': this.stockStatus === 'Adequate Stock'
      }
    },
    stockProgressColor() {
      return {
        'bg-red-500': this.stockStatus === 'Need Restock',
        'bg-yellow-400': this.stockStatus === 'Low Stock',
        'bg-green-500': this.stockStatus === 'Adequate Stock'
      }
    },
    stockPercentage() {
      const max = this.item.minWeight * 2 // Safe level threshold
      const current = Math.min(this.item.totalWeight, max) // Don't exceed max
      return (current / max) * 100
    }
  }
}
</script>