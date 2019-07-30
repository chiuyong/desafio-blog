import Vue from 'vue'
import Vuex from 'vuex'
const fb = require('../config/firebaseConfig')

Vue.use(Vuex)

// handle page reload
fb.auth.onAuthStateChanged(user => {
  if (user) {
    store.commit('setCurrentUser', user)
    store.dispatch('fetchUserProfile')

    fb.usersCollection.doc(user.uid).onSnapshot(doc => {
      store.commit('setUserProfile', doc.data())
    })
  }
})

export const store = new Vuex.Store({
  state: {
    currentUser: null,
    userProfile: {},
    posts: [],
    hiddenPosts: [],
    post: null
  },
  actions: {
    fetchUserProfile({ commit, state }) {
      fb.usersCollection
        .doc(state.currentUser.uid)
        .get()
        .then(res => {
          commit("setUserProfile", res.data());
        })
        .catch(err => {
          console.log(err);
        });
    },
    clearData({ commit }) {
      commit('setCurrentUser', null)
      commit('setUserProfile', {})
    },
    updateProfile({ commit, state }, data) {
      let name = data.name
      let title = data.title

      fb.usersCollection.doc(state.currentUser.uid).update({ name, title }).then(user => {
        // update all posts by user to reflect new name
        fb.postsCollection.where('userId', '==', state.currentUser.uid).get().then(docs => {
          docs.forEach(doc => {
            fb.postsCollection.doc(doc.id).update({
                userName: name
            })
          })
        })

        // update all comments by user to reflect new name
        fb.commentsCollection.where('userId', '==', state.currentUser.uid).get().then(docs => {
          docs.forEach(doc => {
              fb.commentsCollection.doc(doc.id).update({
                  userName: name
              })
          })
        })
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val;
    },
    setUserProfile(state, val) {
      state.userProfile = val;
    },
    setPosts(state, val) {
      if (val) {
          state.posts = val
      } else {
          state.posts = []
      }
  },
    setHiddenPosts(state, val) {
      if (val) {
        // make sure not to add duplicates
        if (!state.hiddenPosts.some(x => x.id === val.id)) {
          state.hiddenPosts.unshift(val)
        }
      } else {
        state.hiddenPosts = []
      }
    }
  }
});