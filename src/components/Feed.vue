<template>
  <v-container fluid>
     <v-toolbar>
    <v-toolbar-title>Meu Blog</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn text>Feed</v-btn>
      <v-btn text>My Posts</v-btn>
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
                <v-list-item-subtitle>Autor: {{getUserName(post.user_id)}}</v-list-item-subtitle>
                <v-list-item-subtitle>Criado em: {{post.created_at | formatDate}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-card-text class="text-justify">{{post.content | trimLength}}</v-card-text>

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

export default {
  data() {
    return {
      posts: [],
      users: [],
      loading: true,
      error: ""
    };
  },
  mounted() {
    this.getPosts();
    this.getUsers();
  },
  methods: {
    getPosts() {
      axios
        .get("https://desafio.tild.com.br/api/posts")
        .then(response => {
          var obj = response.data;
          //recuperar os objetos de cada pagina e concatenar
          for (var i = 1; i <= obj.last_page; i++) {
            axios
              .get("https://desafio.tild.com.br/api/posts?page=" + i)
              .then(response => {
                this.posts = this.posts.concat(response.data.data);
              })
              .catch(error => {
                this.error = error;
                console.log(error);
              });
          }
          this.loading = false;
        })
        .catch(error => {
          this.error = error;
          console.log(error);
        });
    },
    getUsers() {
      axios
        .get("https://desafio.tild.com.br/api/users")
        .then(response => {
          var obj = response.data;
          //recuperar os objetos de cada pagina e concatenar
          for (var i = 1; i <= obj.last_page; i++) {
            axios
              .get("https://desafio.tild.com.br/api/users?page=" + i)
              .then(response => {
                this.users = this.users.concat(response.data.data);
              })
              .catch(error => {
                this.error = error;
                console.log(error);
              });
          }
          this.loading = false;
        })
        .catch(error => {
          this.error = error;
          console.log(error);
        });
    },
    getUserName(user_id) {
      for (var i = 0; i < this.users.length; i++) {
        var user = this.users[i];
        if (user.id === user_id) {
          return user.name;
        }
      }
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
    }
  },
  filters: {
    formatDate(val) {
      if (!val) {
        return "-";
      }
      return moment(val).format("YYYY-MM-DD");
    },
    trimLength(val) {
      if (val.length < 30) {
        return val;
      }
      return `${val.substring(0, 30)}...`;
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