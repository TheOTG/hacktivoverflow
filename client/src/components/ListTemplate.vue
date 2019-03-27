<template>
  <div>
    <div class="container-fluid">
      <div class="row justify-content-center align-items-center">
        <div class="col-7">
          <div class="container-fluid">
            <div class="row justify-content-center align-items-center border-bottom border-dark">
              <div class="col p-0">
                <h3><slot name="top"></slot></h3>
                <slot name="resultLength"></slot>
              </div>
              <div class="col-4">
                <router-link class="float-right my-2" to="/questions/new">
                  <button class="btn btn-primary">Ask Question</button>
                </router-link>
              </div>
            </div>
            <slot name="emptyResult"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'ListTemplate',
};
</script>
