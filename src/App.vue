<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import Post from './components/Post';
import PostDetail from './components/PostDetail';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';


export default {
  name: 'App',
  components: {
    HelloWorld,
    Post,
    PostDetail,
    SignUp,
    SignIn
  },
  data: () => ({
    //
  }),
};
</script>
