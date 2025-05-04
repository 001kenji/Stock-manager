<template>
  <div class="px-4 py-6 sm:px-6 lg:px-8">
    <!-- Header with actions -->
    <div class="sm:flex sm:items-center mb-8">
      <div class="sm:flex-auto">
        <h1 class="text-2xl font-bold text-gray-900">Inventory Management</h1>
        <p class="mt-2 text-sm text-gray-700">
          Total {{ filteredItems.length }} items ({{ restockNeededCount }} need restocking)
        </p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none space-x-3">
        <button
          @click="showAddItemModal = true"
          class="inline-flex cursor-pointer bg-gray-700 items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-agro-green hover:bg-green-700 focus:outline-none"
        >
          <PlusIcon class="-ml-1 mr-2 h-5 w-5" />
          Add Item
        </button>
        <button
          @click="refreshStock"
          class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
        >
          <ArrowPathIcon class="-ml-1 mr-2 h-5 w-5" />
          Refresh
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div class="mb-6 bg-white p-4 rounded-lg shadow-xs border border-gray-200">
      <div class="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <div class="flex-1">
          <label for="search" class="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <input
            type="text"
            id="search"
            v-model="searchQuery"
            placeholder="Search items..."
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-agro-green focus:ring-agro-green sm:text-sm"
          />
        </div>
        <div>
          <label for="category" class="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            id="category"
            v-model="selectedCategory"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-agro-green focus:ring-agro-green sm:text-sm"
          >
            <option value="">All Categories</option>
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </div>
        <div>
          <label for="status" class="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            id="status"
            v-model="selectedStatus"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-agro-green focus:ring-agro-green sm:text-sm"
          >
            <option value="">All Statuses</option>
            <option value="adequate">Adequate</option>
            <option value="restock">Need Restock</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Item
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Current Stock (kg)
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Threshold (kg)
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="item in filteredItems" :key="item.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10 bg-agro-green/10 rounded-full flex items-center justify-center">
                    <CubeIcon class="h-5 w-5 text-agro-green" />
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ item.name }}</div>
                    <div class="text-sm text-gray-500">ID: {{ item.id }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                  {{ item.category }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ item.weight }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ item.threshold }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'px-2 py-1 text-xs font-medium rounded-full',
                    item.weight < item.threshold ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  ]"
                >
                  {{ item.weight < item.threshold ? 'Need Restock' : 'Adequate' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  @click="editItem(item)"
                  class="text-agro-green hover:text-green-700 mr-4"
                >
                  Edit
                </button>
                <button
                  @click="restockItem(item)"
                  class="text-white cursor-pointer bg-gray-700 bg-agro-green hover:bg-green-700 px-3 py-1 rounded-md text-sm"
                >
                  Restock
                </button>
              </td>
            </tr>
            <tr v-if="filteredItems.length === 0">
              <td colspan="6" class="px-6 py-4 text-center text-sm text-gray-500">
                No items found matching your criteria
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add Item Modal -->
    <AddItemModal 
      :show="showAddItemModal"
      @close="showAddItemModal = false"
      @save="handleAddItem"
    />
  </div>
</template>

<script>
import { PlusIcon, ArrowPathIcon, CubeIcon } from '@heroicons/vue/24/outline'
import AddItemModal from '../components/AddItemModal.vue'

export default {
  components: { 
    PlusIcon,
    ArrowPathIcon,
    CubeIcon,
    AddItemModal
  },
  data() {
    return {
      searchQuery: '',
      selectedCategory: '',
      selectedStatus: '',
      showAddItemModal: false,
      items: [
        // Sample data - replace with your actual data source
        { id: 1, name: 'Animal Feed Premium', category: 'Feed', weight: 120, threshold: 150 },
        { id: 2, name: 'NPK Fertilizer', category: 'Fertilizer', weight: 80, threshold: 100 },
        // Add more items...
      ]
    }
  },
  computed: {
    categories() {
      return [...new Set(this.items.map(item => item.category))]
    },
    filteredItems() {
      return this.items.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                             item.category.toLowerCase().includes(this.searchQuery.toLowerCase())
        const matchesCategory = !this.selectedCategory || item.category === this.selectedCategory
        const matchesStatus = !this.selectedStatus || 
                            (this.selectedStatus === 'restock' && item.weight < item.threshold) ||
                            (this.selectedStatus === 'adequate' && item.weight >= item.threshold)
        
        return matchesSearch && matchesCategory && matchesStatus
      })
    },
    restockNeededCount() {
      return this.items.filter(item => item.weight < item.threshold).length
    }
  },
  methods: {
    refreshStock() {
      // Implement actual refresh logic (e.g., API call)
      console.log('Refreshing stock data...')
    },
    editItem(item) {
      // Implement edit functionality
      console.log('Editing item:', item)
    },
    restockItem(item) {
      // Implement restock functionality
      console.log('Restocking item:', item)
    },
    handleAddItem(newItem) {
      // Add new item to inventory
      this.items.push(newItem)
      this.showAddItemModal = false
    }
  }
}
</script>