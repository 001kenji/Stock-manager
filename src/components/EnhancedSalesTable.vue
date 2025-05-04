<template>
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" @click="sortBy('date')">
              Date
              <span v-if="sortField === 'date'" class="ml-1">
                {{ sortDirection === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" @click="sortBy('itemName')">
              Item
              <span v-if="sortField === 'itemName'" class="ml-1">
                {{ sortDirection === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" @click="sortBy('weightSold')">
              Weight (kg)
              <span v-if="sortField === 'weightSold'" class="ml-1">
                {{ sortDirection === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Remaining (kg)
            </th>
            <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="sale in sortedSales" :key="sale.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ formatDate(sale.date) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900">{{ sale.itemName }}</div>
              <div class="text-sm text-gray-500">ID: {{ sale.itemId }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ sale.weightSold.toFixed(2) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ sale.remainingWeight.toFixed(2) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button @click="$emit('edit', sale.id)" class="text-indigo-600 hover:text-indigo-900 mr-4">
                Edit
              </button>
              <button @click="$emit('delete', sale.id)" class="text-red-600 hover:text-red-900">
                Delete
              </button>
            </td>
          </tr>
          <tr v-if="sortedSales.length === 0">
            <td colspan="5" class="px-6 py-4 text-center text-sm text-gray-500">
              No sales records found
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Pagination -->
      <div v-if="sortedSales.length > 0" class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div class="flex-1 flex justify-between sm:hidden">
          <button @click="currentPage = Math.max(1, currentPage - 1)" :disabled="currentPage === 1" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Previous
          </button>
          <button @click="currentPage = Math.min(totalPages, currentPage + 1)" :disabled="currentPage === totalPages" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Next
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Showing <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span>
              to <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, sortedSales.length) }}</span>
              of <span class="font-medium">{{ sortedSales.length }}</span> results
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button @click="currentPage = Math.max(1, currentPage - 1)" :disabled="currentPage === 1" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span class="sr-only">Previous</span>
                &lt;
              </button>
              <button v-for="page in visiblePages" :key="page" @click="currentPage = page" :class="[page === currentPage ? 'bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50', 'relative inline-flex items-center px-4 py-2 border text-sm font-medium']">
                {{ page }}
              </button>
              <button @click="currentPage = Math.min(totalPages, currentPage + 1)" :disabled="currentPage === totalPages" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span class="sr-only">Next</span>
                &gt;
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      sales: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        sortField: 'date',
        sortDirection: 'desc',
        currentPage: 1,
        itemsPerPage: 10
      }
    },
    computed: {
      sortedSales() {
        const sorted = [...this.sales].sort((a, b) => {
          let comparison = 0
          if (a[this.sortField] > b[this.sortField]) {
            comparison = 1
          } else if (a[this.sortField] < b[this.sortField]) {
            comparison = -1
          }
          return this.sortDirection === 'asc' ? comparison : -comparison
        })
  
        const start = (this.currentPage - 1) * this.itemsPerPage
        const end = start + this.itemsPerPage
        return sorted.slice(start, end)
      },
      totalPages() {
        return Math.ceil(this.sales.length / this.itemsPerPage)
      },
      visiblePages() {
        const range = 2
        const start = Math.max(1, this.currentPage - range)
        const end = Math.min(this.totalPages, this.currentPage + range)
        return Array.from({ length: end - start + 1 }, (_, i) => start + i)
      }
    },
    methods: {
      sortBy(field) {
        if (this.sortField === field) {
          this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'
        } else {
          this.sortField = field
          this.sortDirection = 'asc'
        }
        this.currentPage = 1
      },
      formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' }
        return new Date(dateString).toLocaleDateString(undefined, options)
      }
    }
  }
  </script>