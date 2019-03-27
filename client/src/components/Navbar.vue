<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light p-1 border-bottom border-warning">
    <router-link class="navbar-brand mr-4" 
                 to="/"><img src="../../public/stack-overflow-orange.png" 
                 style="width: 32px; height: 32px;">
      HacktivOverflow
    </router-link>
    <button class="navbar-toggler" 
            type="button" 
            data-toggle="collapse" 
            data-target="#navbarSupportedContent">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <router-link class="hov noDecor rounded nav-link" to="/">
        Home
      </router-link>
      <router-link class="hov noDecor rounded nav-link" to="/questions/mylist">
        myQuestions
      </router-link>
      <router-link class="hov noDecor rounded nav-link" to="/myanswers">
        myAnswers
      </router-link>
      <form @submit.prevent="searchQuestion" 
            class="ml-3 mr-3" 
            style="display: inline-block; width: 50%;">
        <input id="search" 
               class="form-control" 
               type="search" 
               placeholder="Search" 
               v-model="search">
      </form>
      <div v-if="!$store.state.isLogin" class="dropdown">
        <a href="#" class="hov noDecor rounded nav-link" data-toggle="dropdown">Login</a>
        <Login />
      </div>
      <router-link v-if="!$store.state.isLogin" 
                   class="hov noDecor rounded nav-link" 
                   to="/register">
        Register
      </router-link>
      <div v-if="$store.state.isLogin" class="nav-item ml-2 mr-2">
        Hello, {{ $store.state.user }}!
      </div>
      <button v-if="$store.state.isLogin" 
              @click.prevent="logout" 
              class="btn btn-danger ml-2 mr-2">
        Sign Out
      </button>
    </div>
  </nav>
</template>

<script>
import Login from '@/components/Login.vue'
export default {
  name: 'Navbar',
  components: {
    Login
  },
  data() {
    return {
      search: '',
    };
  },
  methods: {
    logout() {
      this.$store.dispatch('login');
      this.$swal('Logout successful!', 
                 `See you next time, ${localStorage.name}!`, 
                 'success');
      localStorage.clear();
      this.$router.push('/');
    },
    searchQuestion() {
      this.$router.push({
        path: '/questions/search',
        query: {
          q: this.search,
        },
      });
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  nav {
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1;
  }

  .hov:hover {
    background-color: rgb(221, 221, 221);
    transition: 0.4s;
  }

  .collapse {
    text-align: center;
  }

  .nav-link {
    padding-left: 8px;
    padding-right: 8px;
  }

  #search {
    width: 100%;
    background-image: url('../assets/search.png');
    background-position: 6px 8px;
    background-repeat: no-repeat;
    background-size: 20px;
    padding-left: 35px;
  }

  .noDecor {
    text-decoration: none;
    color: rgb(78, 76, 76);
  }
</style>