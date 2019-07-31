export default {
  setCurrentUser ({ commit }, payload) {
    commit('SET_CURRENT_USER', payload);
  },
  setMyPosts ({ commit }, payload) {
    commit('SET_MYPOSTS', payload);
  }
}