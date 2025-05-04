const state = {
  sales: []
}

const mutations = {
  ADD_SALE(state, sale) {
    state.sales.push({
      ...sale,
      id: Date.now() // Simple ID generation
    })
  },
  UPDATE_SALE(state, updatedSale) {
    const index = state.sales.findIndex(s => s.id === updatedSale.id)
    if (index !== -1) {
      state.sales.splice(index, 1, updatedSale)
    }
  },
  DELETE_SALE(state, saleId) {
    state.sales = state.sales.filter(s => s.id !== saleId)
  }
}

const actions = {
  recordSale({ commit, rootState }, saleData) {
    const item = rootState.stock.items.find(i => i.id === saleData.itemId)
    if (!item) return
    
    commit('ADD_SALE', {
      ...saleData,
      itemName: item.name,
      remainingWeight: item.totalWeight - saleData.weightSold
    })
    
    // Update stock
    commit('stock/UPDATE_STOCK', {
      itemId: saleData.itemId,
      newWeight: item.totalWeight - saleData.weightSold
    }, { root: true })
  },
  updateSale({ commit }, updatedSale) {
    commit('UPDATE_SALE', updatedSale)
  },
  deleteSale({ commit }, saleId) {
    commit('DELETE_SALE', saleId)
  }
}

const getters = {
  weeklySales: state => {
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
    return state.sales.filter(sale => new Date(sale.date) >= oneWeekAgo)
  },
  monthlySales: state => {
    const oneMonthAgo = new Date()
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
    return state.sales.filter(sale => new Date(sale.date) >= oneMonthAgo)
  },
  getSaleById: state => id => state.sales.find(sale => sale.id === id)
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}