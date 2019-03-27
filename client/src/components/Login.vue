<template>
  <form id="login" 
        @submit.prevent="login"
        :class="formClass"
        :style="formStyle">
        <slot name="brand"></slot>
    <div class="form-group">
      <pre v-if="errorMsg" style="color: red; text-align: center;">{{ errorMsg }}</pre>
      <label>Email address</label>
      <input type="email"
             class="form-control"
             placeholder="E-mail"
             v-model="email">
    </div>
    <div class="form-group">
      <label>Password</label>
      <input type="password"
             class="form-control"
             placeholder="Password"
             v-model="password">
    </div>
    <button type="submit"
            class="btn btn-primary"
            style="width: 100%;">
      Login
    </button>
    <div v-if="isLoading" class="d-flex justify-content-center">
      <div class="spinner-border text-primary"></div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      isLoading: false,
      errorMsg: null,
    };
  },
  methods: {
    login() {
      this.isLoading = true;
      this.$axios
        .post('/user/login', {
          email: this.email,
          password: this.password,
        })
        .then(({ data }) => {
          const { access_token, name, userId } = data;
          localStorage.setItem('access_token', access_token);
          localStorage.setItem('name', name);
          localStorage.setItem('userId', userId);
          this.$swal('Login successful!',
            `Welcome back, ${name}!`,
            'success');
          this.$store.dispatch('login', name);
          this.$store.dispatch('getMyAnswers');
          this.errorMsg = null;
          this.$router.push('/questions/mylist');
        })
        .catch((err) => {
          this.errorMsg = err.response.data.message;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
  props: ['formStyle', 'formClass'],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
