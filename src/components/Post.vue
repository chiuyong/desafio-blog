<template>
  <v-container fluid>
    <v-toolbar>
      <v-toolbar-title>Meu Blog</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn text @click="myPost">My Posts</v-btn>
        <v-btn text @click="feed">Feed</v-btn>
        <v-btn text @click="createPost">Create Post</v-btn>
        <v-btn text>Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-container v-if="loading">
      <div class="text-xs-center">
        <v-progress-circular indeterminate :size="150" :width="8" color="green"></v-progress-circular>
      </div>
    </v-container>

    <v-container v-else grid-list-xl>
      <v-layout wrap>
        <v-flex xs4 v-for="post in posts" :key="post.id" mb-2>
          <v-card max-width="344" class="mx-auto card">
            <v-img :src="post.image" height="194" class="card-img"></v-img>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="headline">{{post.title}}</v-list-item-title>
                <v-list-item-subtitle>Autor: {{getAuthor()}}</v-list-item-subtitle>
                <v-list-item-subtitle>Criado em: {{post.created_at | formatDate}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-card-text class="text-justify">{{post.content}}</v-card-text>

            <v-card-actions>
              <v-btn text color="deep-purple accent-4" @click="postDetail(post.id)">Ler Mais</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
import axios from "axios";
import moment from "moment";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      posts: [],
      loading: true,
      error: "",
      user: {}
    };
  },
  computed: {
    ...mapGetters(["getCurrentUser"])
  },
  mounted() {
    this.getMyPosts();
  },
  methods: {
    getMyPosts() {
      console.log(this.getCurrentUser);
      this.user = this.getCurrentUser;
      for (var i = 0; i < this.user.posts.length; i++) {
        this.posts = this.posts.concat(this.user.posts[i]);
      }
      this.loading = false;
    },
    postDetail(post_id) {
      console.log("postdetail");
      this.$router.push("/postdetail/" + post_id);
    },
    createPost() {
      console.log("createpost");
      this.$router.push("/createpost");
    },
    feed() {
      console.log("feed");
      this.$router.push("/feed");
    },
    getAuthor() {
      return this.user.name;
    },
    myPost() {
      console.log("myPost");
      this.$router.push("/post");
    },
  },
  filters: {
    formatDate(val) {
      if (!val) {
        return "-";
      }
      return moment(val).format("YYYY-MM-DD");
    }
  }
};
</script>

<style>
.card {
  background: #f5f5f5;
  padding: 10px;
  margin: 0 0 1em;
  width: 100%;
  cursor: pointer;
  -webkit-perspective: 1000;
  -webkit-backface-visibility: hidden;
  transition: all 100ms ease-in-out;
  display: inline-block;
}
.card:hover {
  transform: translateY(-0.5em);
  background: #ebebeb;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
.card-img {
  display: block;
  width: 100%;
}
</style>