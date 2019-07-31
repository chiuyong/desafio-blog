<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12" v-if="showLoginForm" @submit.prevent>
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model.trim="loginForm.email"
                    prepend-icon="mdi-email"
                    name="email"
                    id="email"
                    label="E-mail"
                    type="text"
                  ></v-text-field>
                  <!--
                  <v-text-field
                    v-model.trim="loginForm.password"
                    id="password"
                    prepend-icon="mdi-lock"
                    name="password"
                    label="Password"
                    type="password"
                  ></v-text-field>
                  -->
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-btn color="primary" @click="toggleForm">Criar Conta</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login">Entrar</v-btn>
              </v-card-actions>
            </v-card>

            <!-- SignUp -->
            <v-card class="elevation-12" v-else @submit.prevent>
              <v-toolbar dark color="primary">
                <v-toolbar-title>Cadastro Usuário</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="name"
                    v-model.trim="signupForm.name"
                    :error-messages="nameErrors"
                    label="Nome"
                    required
                    @input="$v.name.$touch()"
                    @blur="$v.name.$touch()"
                  ></v-text-field>
                  <v-text-field
                    v-model="email"
                    v-model.trim="signupForm.email"
                    :error-messages="emailErrors"
                    label="E-mail"
                    required
                    @input="$v.email.$touch()"
                    @blur="$v.email.$touch()"
                  ></v-text-field>
                  <v-text-field
                    v-model="age"
                    v-model.trim="signupForm.age"
                    :error-messages="ageErrors"
                    label="Idade"
                    required
                    @input="$v.age.$touch()"
                    @blur="$v.age.$touch()"
                  ></v-text-field>
                  <v-text-field
                    name="password"
                    id="password"
                    type="password"
                    label="Password"
                    v-model="password"
                    v-model.trim="signupForm.password"
                    :error-messages="passwordErrors"
                    @input="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                    required
                  ></v-text-field>

                  <v-card-actions>
                    <v-btn color="primary" @click="toggleForm">Voltar</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="signup">Criar</v-btn>
                  </v-card-actions>
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
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  validations: {
    name: { required },
    email: { required, email },
    age: { required },
    password: { required }
  },
  data() {
    return {
      loginForm: {
        email: ""
      },
      signupForm: {
        name: "",
        email: "",
        age: "",
        password: ""
      },
      showLoginForm: true,
      performingRequest: false,
      errorMsg: ""
    };
  },
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push("Nome é obrigatório!");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail é obrigatório!");
      return errors;
    },
    ageErrors() {
      const errors = [];
      if (!this.$v.age.$dirty) return errors;
      !this.$v.age.required && errors.push("Idade é obrigatório!");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Senha é obrigatório!");
      return errors;
    }
  },
  methods: {
    toggleForm() {
      this.errorMsg = "";
      this.showLoginForm = !this.showLoginForm;
    },
    login() {
      this.performingRequest = true;
      //Requisição HTTP para pegar o id do User
      axios
        .get("https://desafio.tild.com.br/api/users")
        .then(response => {
          var obj = response.data;
          //Varrer todas a pags USER API
          for (var i = 1; i <= obj.last_page; i++) {
            axios
              //Página Atual
              .get("https://desafio.tild.com.br/api/users?page=" + i)
              .then(res => {
                var currentPage = res.data;
                //Verificar se Email Existe
                for (var j = 0; j < currentPage.data.length; j++) {
                  var user = currentPage.data[j];
                  if (this.loginForm.email === user.email) {
                    var user_id = user.id;

                    //Fetch do User para pegar os dados
                    axios
                      .get("https://desafio.tild.com.br/api/users/" + user_id)
                      .then(resp => {
                        var currentUser = resp.data                        
                        this.$store.dispatch(
                          "setCurrentUser",
                          currentUser
                        );
                        console.log(this.$store.getters.getCurrentUser);
                        this.performingRequest = false;
                        this.$router.push("/post/" + currentUser.id);                        
                      })
                      .catch(error => {
                        this.errorMsg = error;
                        console.log(error);
                      });
                  }
                }
              })
              .catch(error => {
                this.errorMsg = error;
                this.performingRequest = false;
                console.log(error);
              });
          }
        })
        .catch(error => {
          this.performingRequest = false;
          console.log(error);
        });
    },
    signup() {
      this.performingRequest = true;
      axios
        .post("https://desafio.tild.com.br/api/users", {
          name: this.signupForm.name,
          email: this.signupForm.email,
          age: this.signupForm.age,
          password: this.signupForm.password
        })
        .then(response => {
          var obj = response.data;          
          this.$store.dispatch("setCurrentUser", obj);
          console.log(this.$store.getters.getCurrentUser);
          this.performingRequest = false;
          this.$router.push("/post/" + obj.id);
        })
        .catch(error => {
          this.errorMsg = error;
          console.log(error);
        });
    }
  }
};
</script>

