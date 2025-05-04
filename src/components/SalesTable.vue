<template>
    <div class="overflow-x-auto">
      <p>am sales</p>
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight Sold (kg)</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remaining Stock (kg)</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="sale in sales" :key="sale.date + sale.itemId">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ sale.date }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ sale.itemName }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ sale.weightSold }}kg</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ sale.remainingWeight }}kg</td>
          </tr>
          <tr v-if="sales.length === 0">
            <td colspan="4" class="px-6 py-4 text-center text-sm text-gray-500">No sales recorded yet</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      sales: {
        type: Array,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  table {
    border-collapse: separate;
    border-spacing: 0;
  }
  
  th {
    position: sticky;
    top: 0;
    background-color: #f9fafb;
    z-index: 10;
  }
  
  tr:hover {
    background-color: #f8f9fa;
  }
  </style>