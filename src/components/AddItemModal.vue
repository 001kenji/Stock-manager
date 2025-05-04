<template>
    <TransitionRoot appear :show="show" as="template">
      <Dialog as="div" @close="closeModal" class="relative z-50">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-50" />
        </TransitionChild>
  
        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900 border-b pb-4"
                >
                  Add New Inventory Item
                </DialogTitle>
  
                <form @submit.prevent="handleSubmit" class="mt-4 text-black space-y-4">
                  <div>
                    <label for="name" class="block text-sm font-medium text-gray-700">Item Name</label>
                    <input
                      type="text"
                      id="name"
                      v-model="form.name"
                      required
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-agro-green focus:ring-agro-green sm:text-sm"
                    />
                  </div>
  
                  <div>
                    <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
                    <select
                      id="category"
                      v-model="form.category"
                      required
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-agro-green focus:ring-agro-green sm:text-sm"
                    >
                      <option value="">Select a category</option>
                      <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
                    </select>
                  </div>
  
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label for="weight" class="block text-sm font-medium text-gray-700">Initial Stock (kg)</label>
                      <input
                        type="number"
                        id="weight"
                        v-model.number="form.weight"
                        min="0.1"
                        step="0.1"
                        required
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-agro-green focus:ring-agro-green sm:text-sm"
                      />
                    </div>
                    <div>
                      <label for="threshold" class="block text-sm font-medium text-gray-700">Restock Threshold (kg)</label>
                      <input
                        type="number"
                        id="threshold"
                        v-model.number="form.threshold"
                        min="0.1"
                        step="0.1"
                        required
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-agro-green focus:ring-agro-green sm:text-sm"
                      />
                    </div>
                  </div>
  
                  <div class="mt-6 flex justify-end space-x-3 border-t pt-4">
                    <button
                      type="button"
                      @click="closeModal"
                      class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      class="inline-flex justify-center cursor-pointer bg-gray-700 rounded-md border border-transparent bg-agro-green px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none"
                    >
                      Save Item
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </template>
  
  <script>
  import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
  } from '@headlessui/vue'
  
  export default {
    components: {
      TransitionRoot,
      TransitionChild,
      Dialog,
      DialogPanel,
      DialogTitle,
    },
    props: {
      show: Boolean,
      categories: ['Fertalizer','Feeds','Insectiside']
    },
    data() {
      return {
        form: {
          name: '',
          category: '',
          weight: 0,
          threshold: 0
        }
      }
    },
    methods: {
      closeModal() {
        this.$emit('close')
        this.resetForm()
      },
      handleSubmit() {
        this.$emit('save', {
          ...this.form,
          id: Date.now() // Temporary ID - replace with actual ID generation
        })
        this.closeModal()
      },
      resetForm() {
        this.form = {
          name: '',
          category: '',
          weight: 0,
          threshold: 0
        }
      }
    }
  }
  </script>