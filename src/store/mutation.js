export default {
 
  setDrawer: (state, payload) => { state.drawer = payload },
  LOADING: (state) => {
    state.status = {
      loading: true,
      success: false,
      error: false
    }
  },
  SUCCESS: (state) => {
    state.status = {
      loading: false,
      success: true,
      error: false
    }
  },
  ERROR: (state, payload) => {
    state.status = {
      loading: false,
      success: false,
      error: payload
    }
  },
  CLEAR_ERROR: (state) => {
    state.status = {
      loading: false,
      success: false,
      error: false
    }
  },
  SET_Posts: (state, payload) => { state.posts = payload },
  SET_comments: (state, payload) => { state.comments = payload },
  SET_PostComments: (state, payload) => {
    let filtered = []
    let comments = state.comments
    for (let arr in comments) {
      for (let parent in comments[arr].metadata.parent_id) {
         // console.log('id: ', comments[arr].metadata.parent_id[parent]._id)
        if (comments[arr].metadata.parent_id[parent]._id == payload) {
          filtered.push(comments[arr])
        }
      }
    }
    state.postComments = filtered
  }
}