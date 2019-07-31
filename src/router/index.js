import Vue from 'vue'
import Router from 'vue-router'
import SignIn from '../components/SignIn'

import Post from '../components/Post'
import PostDetail from '../components/PostDetail'
import CreatePost from '../components/CreatePost'
import Feed from '../components/Feed'
import store from '../store'

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
			path: '/post/:user_id',
      name: 'Post',
      props: true,
      component: Post,
      meta: {
        requiresAuth: true
      }       
		},
    {
			path: '/postdetail/:post_id',
      name: 'PostDetail',
      props: true,
      component: PostDetail,
      meta: {
        requiresAuth: true
      }
    },
    {
			path: '/createpost/',
      name: 'CreatePost',
      props: true,      
      component: CreatePost,
      meta: {
        requiresAuth: true
      }
    },
    {
			path: '/feed',
      name: 'Feed',
      props: true,
      component: Feed,
      meta: {
        requiresAuth: true
      }
    },
    
	]
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  var currentUser = store.state.currentUser;
  if (requiresAuth && !currentUser) {
    next('/signin');
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});


export default router