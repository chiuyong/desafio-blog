export default {
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
  SET_MYPOSTS: (state, payload) => { state.posts = payload },
  SET_CURRENT_USER: (state, payload) => { state.currentUser = payload },
  SET_CURRENT_POST: (state, payload) => { 
    state.id = payload.id,
    state.title = payload.title,
    state.content = payload.content,
    state.image = payload.image,
    state.user_id = payload.user_id,
    state.created_at = payload.created_at
  },
  SET_POST_COMMENTS: (state, payload) => {
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