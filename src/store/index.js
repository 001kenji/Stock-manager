import { createStore } from 'vuex'
import stock from './modules/stock'
import sales from './modules/sales'

export default createStore({
    state: {
      items: [
        { id: 1, name: 'Animal Feed (25kg)', totalWeight: 500, minWeight: 100 },
        { id: 2, name: 'Fertilizer (NPK)', totalWeight: 800, minWeight: 200 },
        { id: 3, name: 'Poultry Feed (50kg)', totalWeight: 600, minWeight: 150 },
        { id: 4, name: 'Urea Fertilizer', totalWeight: 1000, minWeight: 300 },
        { id: 5, name: 'Maize Seeds (Hybrid)', totalWeight: 200, minWeight: 50 },
        { id: 6, name: 'Wheat Seeds', totalWeight: 250, minWeight: 60 },
        { id: 7, name: 'Tractor Fuel (Diesel)', totalWeight: 1200, minWeight: 400 },
        { id: 8, name: 'Irrigation Pipes', totalWeight: 700, minWeight: 200 },
        { id: 9, name: 'Insecticide (5L)', totalWeight: 100, minWeight: 20 },
        { id: 10, name: 'Herbicide (5L)', totalWeight: 150, minWeight: 30 },
        { id: 11, name: 'Lime Powder (25kg)', totalWeight: 400, minWeight: 100 },
        { id: 12, name: 'Cattle Minerals', totalWeight: 300, minWeight: 80 },
        { id: 13, name: 'Pig Feed (30kg)', totalWeight: 550, minWeight: 120 },
        { id: 14, name: 'Dairy Meal', totalWeight: 500, minWeight: 110 },
        { id: 15, name: 'Hay Bales', totalWeight: 800, minWeight: 250 },
        { id: 16, name: 'Silage', totalWeight: 900, minWeight: 300 },
        { id: 17, name: 'Organic Compost', totalWeight: 600, minWeight: 180 },
        { id: 18, name: 'Greenhouse Film Roll', totalWeight: 100, minWeight: 25 },
        { id: 19, name: 'Drip Irrigation Kit', totalWeight: 150, minWeight: 40 },
        { id: 20, name: 'Molasses (20L)', totalWeight: 180, minWeight: 50 }
      ],
      sales: []
    },
    mutations: {
      ADD_SALE(state, sale) {
        state.sales.push(sale)
        const item = state.items.find(i => i.id === sale.itemId)
        if (item) item.weight -= sale.weight
      }
    },
    actions: {
      addSale({ commit }, sale) {
        commit('ADD_SALE', {
          ...sale,
          date: new Date().toISOString().split('T')[0]
        })
      }
    },
    getters: {
      itemsNeedingRestock: state => state.items.filter(item => item.weight < item.threshold),
      weeklySales: state => {
        const oneWeekAgo = new Date()
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
        return state.sales.filter(sale => new Date(sale.date) >= oneWeekAgo)
      }
    },
    modules: { stock, sales }
  })