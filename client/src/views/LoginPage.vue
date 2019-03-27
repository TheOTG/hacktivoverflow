<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-5 mt-5">
        <Login :form-class="''"
               :form-style="''">
          <template v-slot:brand>
            <h3 class="text-center">Hacktiv Overflow</h3>
          </template>
        </Login>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue';

export default {
  name: 'LoginPage',
  components: {
    Login,
  },
};
</script>
