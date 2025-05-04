<template>
  <div class="min-h-screen bg-gray-100 text-slate-900 ">
    <NavigationBar />
    <main class="container mx-auto px-4 py-8">
      <router-view />
    </main>
  </div>
</template>

<script>
import NavigationBar from './components/NavigationBar.vue'

export default {
  components: { NavigationBar }
}
</script>

<style>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #2d5a27;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #1e3f1a;
}
</style>