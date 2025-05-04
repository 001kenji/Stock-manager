<template>
  <div class="px-4 py-6 sm:px-6 lg:px-8">
    <!-- Header Section -->
    <div class="sm:flex sm:items-center justify-between mb-8">
      <div class="mb-4 sm:mb-0">
        <h1 class="text-2xl font-bold text-gray-900">Sales Records</h1>
        <p class="mt-1 text-sm text-gray-600">
          Track and manage all sales transactions
        </p>
      </div>
      <div class="flex flex-col sm:flex-row gap-3">
        <button
          @click="exportSales"
          class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
        >
          <DocumentArrowDownIcon class="-ml-1 mr-2 h-5 w-5" />
          Export Data
        </button>
        <button
          @click="showSalesForm = true"
          class="inline-flex items-center cursor-pointer bg-gray-700 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-agro-green hover:bg-green-700 focus:outline-none"
        >
          <PlusIcon class="-ml-1 mr-2 h-5 w-5" />
          New Sale
        </button>
      </div>
    </div>

    <!-- Filters and Stats -->
    <div class="bg-white rounded-lg shadow-xs border border-gray-200 p-4 mb-6">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div class="flex-1 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div class="bg-gray-50 p-3 rounded-lg">
            <p class="text-sm font-medium text-gray-500 truncate">Today's Sales</p>
            <p class="mt-1 text-xl font-semibold text-gray-900">
              {{ todaysSales }} kg
            </p>
          </div>
          <div class="bg-gray-50 p-3 rounded-lg">
            <p class="text-sm font-medium text-gray-500 truncate">Weekly Sales</p>
            <p class="mt-1 text-xl font-semibold text-agro-green">
              {{ weeklySales }} kg
            </p>
          </div>
          <div class="bg-gray-50 p-3 rounded-lg">
            <p class="text-sm font-medium text-gray-500 truncate">Monthly Sales</p>
            <p class="mt-1 text-xl font-semibold text-gray-900">
              {{ monthlySales }} kg
            </p>
          </div>
          <div class="bg-gray-50 p-3 rounded-lg">
            <p class="text-sm font-medium text-gray-500 truncate">Total Items</p>
            <p class="mt-1 text-xl font-semibold text-gray-900">
              {{ items.length }}
            </p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <select
            v-model="dateFilter"
            class="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-agro-green focus:outline-none focus:ring-agro-green sm:text-sm"
          >
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="all">All Time</option>
          </select>
          <button
            @click="refreshSales"
            class="p-2 text-gray-500 hover:text-gray-700"
            title="Refresh data"
          >
            <ArrowPathIcon class="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Sales Table -->
    <div class="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
      <EnhancedSalesTable :sales="filteredSales" @edit="editSale" @delete="confirmDeleteSale" />
    </div>

    <!-- New Sale Modal -->
    <SaleFormModal
      :show="showSalesForm"
      :items="items"
      @close="showSalesForm = false"
      @submit="handleNewSale"
    />
  </div>
</template>

<script>
import { PlusIcon, DocumentArrowDownIcon, ArrowPathIcon } from '@heroicons/vue/24/outline'
import EnhancedSalesTable from '../components/EnhancedSalesTable.vue'
import SaleFormModal from '../components/SaleFormModal.vue'
import { mapState ,mapActions} from 'vuex'

export default {
  components: {
    PlusIcon,
    DocumentArrowDownIcon,
    ArrowPathIcon,
    EnhancedSalesTable,
    SaleFormModal
  },
  data() {
    return {
      showSalesForm: false,
      dateFilter: 'week',
    }
  },
  computed: {
    ...mapState('stock', ['items']),
    ...mapState('sales', ['sales']),
    
    filteredSales() {
      const now = new Date()
      switch (this.dateFilter) {
        case 'day':
          const todayStart = new Date(now.setHours(0, 0, 0, 0))
          return this.sales.filter(s => new Date(s.date) >= todayStart)
        case 'week':
          const weekStart = new Date(now.setDate(now.getDate() - now.getDay()))
          return this.sales.filter(s => new Date(s.date) >= weekStart)
        case 'month':
          const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
          return this.sales.filter(s => new Date(s.date) >= monthStart)
        default:
          return this.sales
      }
    },
    todaysSales() {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return this.sales
        .filter(s => new Date(s.date) >= today)
        .reduce((sum, sale) => sum + sale.weightSold, 0)
    },
    weeklySales() {
      const weekStart = new Date()
      weekStart.setDate(weekStart.getDate() - weekStart.getDay())
      return this.sales
        .filter(s => new Date(s.date) >= weekStart)
        .reduce((sum, sale) => sum + sale.weightSold, 0)
    },
    monthlySales() {
      const monthStart = new Date()
      monthStart.setDate(1)
      monthStart.setHours(0, 0, 0, 0)
      return this.sales
        .filter(s => new Date(s.date) >= monthStart)
        .reduce((sum, sale) => sum + sale.weightSold, 0)
    }
  },
  methods: {
    ...mapActions('sales', ['recordSale', 'deleteSale', 'fetchSales']),
    
    refreshSales() {
      this.fetchSales()
    },
    
    handleNewSale(saleData) {
      const item = this.items.find(i => i.id === saleData.itemId)
      if (!item) return
      
      const sale = {
        ...saleData,
        itemName: item.name,
        remainingWeight: item.totalWeight - saleData.weightSold
      }
      
      this.recordSale(sale)
      this.showSalesForm = false
    },
    
    editSale(saleId) {
      // Implement edit functionality
      console.log('Editing sale:', saleId)
    },
    
    confirmDeleteSale(saleId) {
      if (confirm('Are you sure you want to delete this sale record?')) {
        this.deleteSale(saleId)
      }
    },
    
    exportSales() {
      // Implement CSV export
      const headers = ['Date', 'Item', 'Weight Sold (kg)', 'Remaining Stock (kg)']
      const csvContent = [
        headers.join(','),
        ...this.filteredSales.map(sale => 
          `"${sale.date}","${sale.itemName}",${sale.weightSold},${sale.remainingWeight}`
        )
      ].join('\n')
      
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = `sales-export-${new Date().toISOString().split('T')[0]}.csv`
      link.click()
    }
  }
}
</script>