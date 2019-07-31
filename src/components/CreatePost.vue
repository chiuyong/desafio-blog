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

    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <!-- SignUp -->
          <v-card class="elevation-12" @submit.prevent>
            <v-toolbar dark color="primary">
              <v-toolbar-title>Crie Sua Postagem</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="title"
                  v-model.trim="createPostForm.title"
                  :error-messages="titleErrors"
                  label="Título"
                  required
                  @input="$v.title.$touch()"
                  @blur="$v.title.$touch()"
                ></v-text-field>
                <v-textarea
                  outlined
                  v-model="content"
                  v-model.trim="createPostForm.content"
                  :error-messages="contentErrors"
                  @input="$v.content.$touch()"
                  @blur="$v.content.$touch()"
                  name="input-7-4"
                  label="Conteúdo"                  
                  required                  
                ></v-textarea>                
                <v-layout justify-center>
                  <v-card-actions>
                    <v-btn color="primary" @click="newPost">Criar</v-btn>
                  </v-card-actions>
                </v-layout>
              </v-form>
              <transition name="fade">
                <div v-if="performingRequest" class="loading">
                  <p align-center>Loading...</p>
                </div>
              </transition>
              <transition name="fade">
                <div v-if="errorMsg !== ''" class="error-msg">
                  <p center>{{ errorMsg }}</p>
                </div>
              </transition>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
import axios from "axios";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { mapGetters } from 'vuex';

export default {
  mixins: [validationMixin],
  validations: {
    title: { required },
    content: { required }
  },
  data() {
    return {
      posts: [],
      users: [],
      performingRequest: false,
      errorMsg: "",
      createPostForm: {
        title: "",
        content: ""
      }
    };
  },
  computed: {
    titleErrors() {
      const errors = [];
      if (!this.$v.title.$dirty) return errors;
      !this.$v.title.required && errors.push("Título é obrigatório!");
      return errors;
    },
    contentErrors() {
      const errors = [];
      if (!this.$v.content.$dirty) return errors;
      !this.$v.content.required && errors.push("Conteúdo é obrigatório!");
      return errors;
    },    
    ...mapGetters([
      'getCurrentUser'
    ])
  },
  methods: {
    newPost() {
      console.log(this.getCurrentUser.id)
      axios
        .post("https://desafio.tild.com.br/api/posts", {
          title: this.createPostForm.title,
          content: this.createPostForm.content,
          user_id: this.getCurrentUser.id            
        })
        .then(response => {
          var obj = response.data;          
          this.$store.dispatch("setMyPosts", obj);
          console.log(this.$store.state)                
          this.performingRequest = false;  
          this.$router.push("/post")        
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
    feed() {
      console.log("feed");
      this.$router.push("/feed");
    },
    myPost() {
      console.log("myPost");
      this.$router.push("/post");
    }
  }
};
</script>