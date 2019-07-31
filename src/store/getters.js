export default {
  getPost: state => { return state.post },
  getCurrentUser: state => { return state.currentUser },
  getMyPosts: state => { return state.posts },
  getPostComments: state => { return state.postComments },
  getStatus: state => { return state.status },
  getCurrentPost: state => { return state.currentPost }
}