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

    <v-container v-else fluid>
      <v-layout wrap>
        <v-flex xs12 sm12 mb-2>
          <v-card class="mx-auto card">
            <v-container>
              <v-layout row>
                <v-flex xs5>
                  <v-img :src="this.post.image" class="card-img"></v-img>
                </v-flex>

                <v-flex 7 xs>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="headline">{{this.post.title}}</v-list-item-title>
                      <v-list-item-subtitle>Autor: {{this.post.user.name}}</v-list-item-subtitle>
                      <v-list-item-subtitle>Criado em: {{this.post.created_at}}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-container fluid>
                    <v-divider></v-divider>
                  </v-container>

                  <v-card-text class="text-justify">{{this.post.content}}</v-card-text>

                  <v-card-actions>
                    <v-btn text color="deep-purple accent-4">Ler Mais</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      post: {},
      loading: true
    };
  },
  mounted() {
    this.getPost(this.$route.params.post_id);
  },
  methods: {
    getPost(post_id) {
      axios
        .get("https://desafio.tild.com.br/api/posts/" + post_id)
        .then(response => {
          this.post = response.data;
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
        });
    },
    postDetail(post_id) {
      console.log("oi");
      this.$router.push("/postdetail/" + post_id);
    },
    createPost() {
      console.log("createpost");
      this.$router.push("/createpost");
    },
    myPost() {
      console.log("myPost");
      this.$router.push("/post");
    },
    feed() {
      console.log("feed");
      this.$router.push("/feed");
    },
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