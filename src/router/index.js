import Vue from 'vue'
import Router from 'vue-router'
import SignIn from '../components/SignIn'

import Post from '../components/Post'
import PostDetail from '../components/PostDetail'

Vue.use(Router)

const router = new Router({
	mode: 'history',
	routes: [
		{
			path: '*',
			redirect: '/signin'
    },
    {
			path: "/signin",
      name: "SignIn",
      component: SignIn,
    },
    {
			path: '/post',
			name: 'Post',
			component: Post,       
		},
    {
			path: '/postdetail/:post_id',
      name: 'PostDetail',
      props: true,
			component: PostDetail,
    }
    
	]
});

/*
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const currentUser = firebase.auth().currentUser;

  if (requiresAuth && !currentUser) {
    next('/signin');
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});
*/

export default router