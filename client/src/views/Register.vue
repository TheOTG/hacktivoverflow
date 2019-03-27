<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-4">
        <form @submit.prevent="register">
          <h3 class="text-center">Hacktiv Overflow</h3>
          <pre v-if="errorMsg" style="color: red; text-align: center;">{{ errorMsg }}</pre>
          <div class="form-group">
            <label>Display Name</label>
            <input type="text"
                   class="form-control"
                   placeholder="Name"
                   v-model="name">
          </div>
          <div class="form-group">
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
          <button v-if="!isLoading"
                  type="submit"
                  class="btn btn-primary w-100">
            Register
          </button>
          <div v-if="isLoading" class="d-flex justify-content-center">
            <div class="spinner-border text-primary"></div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Register',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      isLoading: false,
      errorMsg: null,
    };
  },
  methods: {
    register() {
      this.isLoading = true;
      this.$axios
        .post('/user/register', {
          name: this.name,
          email: this.email,
          password: this.password,
        })
        .then(({ data }) => {
          this.$swal('Registration success!',
            `Welcome aboard, ${data.name}!`,
            'success');
          this.errorMsg = null;
          this.$router.push('/login');
        })
        .catch((err) => {
          const { errors } = err.response.data;
          this.errorMsg = [];
          for (const key in errors) {
            this.errorMsg.push(errors[key].message);
          }
          this.errorMsg = this.errorMsg.join('\n');
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>
