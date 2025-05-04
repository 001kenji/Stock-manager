<template>
    <TransitionRoot appear :show="show" as="template">
      <Dialog as="div" class="fixed inset-0 z-50 overflow-y-auto" @close="$emit('close')">
        <div class="min-h-screen px-4 text-center">
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="ease-in duration-200"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay class="hidden inset-0  bg-opacity-50" />
          </TransitionChild>
  
          <span class="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>
  
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <div class="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                {{ editingSale ? 'Edit Sale Record' : 'Record New Sale' }}
              </DialogTitle>
  
              <form @submit.prevent="handleSubmit" class="mt-4 space-y-4 text-black">
                <div>
                  <label for="item" class="block text-sm font-medium text-gray-700">Item</label>
                  <select
                    id="item"
                    v-model="form.itemId"
                    required
                    class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="">Select an item</option>
                    <option v-for="item in availableItems" :key="item.id" :value="item.id">
                      {{ item.name }} ({{ item.totalWeight.toFixed(2) }}kg available)
                    </option>
                  </select>
                </div>
  
                <div>
                  <label for="weight" class="block text-sm font-medium text-gray-700">Weight Sold (kg)</label>
                  <input
                    type="number"
                    id="weight"
                    v-model.number="form.weightSold"
                    min="0.01"
                    step="0.01"
                    required
                    class="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                  />
                </div>
  
                <div>
                  <label for="date" class="block text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    id="date"
                    v-model="form.date"
                    required
                    class="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                  />
                </div>
  
                <div class="pt-4 border-t border-gray-200 flex justify-end space-x-3">
                  <button
                    type="button"
                    class="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none"
                    @click="$emit('close')"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    class="inline-flex justify-center cursor-pointer bg-gray-700 px-4 py-2 text-sm font-medium text-white bg-agro-green border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none"
                  >
                    {{ editingSale ? 'Update Sale' : 'Record Sale' }}
                  </button>
                </div>
              </form>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>
  </template>
  
  <script>
  import { ref, computed, watch } from 'vue'
  import { TransitionRoot, TransitionChild, Dialog, DialogOverlay, DialogTitle } from '@headlessui/vue'
  
  export default {
    components: {
      TransitionRoot,
      TransitionChild,
      Dialog,
      DialogOverlay,
      DialogTitle
    },
    props: {
      show: Boolean,
      items: Array,
      sale: {
        type: Object,
        default: null
      }
    },
    setup(props, { emit }) {
      const form = ref({
        itemId: '',
        weightSold: 0,
        date: new Date().toISOString().split('T')[0]
      })
      const resetForm = () => {
        form.value = {
          itemId: '',
          weightSold: 0,
          date: new Date().toISOString().split('T')[0]
        }
      }
      const editingSale = computed(() => props.sale !== null)
  
      const availableItems = computed(() => {
        return props.items.filter(item => item.totalWeight > 0)
      })
  
      watch(() => props.sale, (newSale) => {
        if (newSale) {
          form.value = {
            itemId: newSale.itemId,
            weightSold: newSale.weightSold,
            date: newSale.date
          }
        } else {
          resetForm()
        }
      }, { immediate: true })
  
     
  
      const handleSubmit = () => {
        emit('submit', form.value)
        resetForm()
      }
  
      return {
        form,
        editingSale,
        availableItems,
        handleSubmit
      }
    }
  }
  </script>