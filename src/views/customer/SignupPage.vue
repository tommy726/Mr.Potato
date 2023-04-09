<template>
  <div class="container my-8 py-xxl-8">
    <div class="row justify-content-center">
      <div class="col-xxl-3 col-lg-4 col-sm-7 col">
        <div class="card">
          <div class="card-header text-center bg-warning">
            <h2 class="h3 mb-0">會員註冊</h2>
          </div>
          <div class="card-body p-5">
            <Form @submit="signup" v-slot="{ meta }">
              <div v-for="{ name, label, rules, type } in user" :key="name" class="mb-3">
                <label :for="name" class="form-label w-100"
                  >{{ label }}
                  <Field
                    :id="name"
                    :name="name"
                    :rules="rules"
                    v-slot="{ field, errorMessage, meta }"
                  >
                    <input
                      v-bind="field"
                      :type="type"
                      class="form-control"
                      :class="{ 'is-valid': meta.valid, 'is-invalid': errorMessage }"
                    />
                    <span v-if="errorMessage && meta.touched" class="text-danger fa-sm">
                      {{ errorMessage }}
                    </span>
                  </Field>
                </label>
              </div>
              <button
                :disabled="!meta.valid"
                type="submit"
                class="btn w-100 btn-primary text-white mt-3 mt-md-5"
              >
                Sign Up
              </button>
            </Form>
          </div>
          <div class="card-footer text-muted text-end bg-warning">
            <router-link to="/login">已經有帳號了？</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignupPage',
  data() {
    return {
      user: [
        {
          label: '姓名',
          name: 'name',
          as: 'input',
          rules: 'required',
        },
        {
          label: '電話',
          name: 'tel',
          as: 'input',
          type: 'tel',
          rules: 'required',
        },
        {
          label: '信箱',
          name: 'email',
          as: 'input',
          rules: 'required|email',
        },
        {
          label: '密碼',
          name: 'password',
          as: 'input',
          type: 'password',
          rules: 'required',
        },
        {
          label: '確認密碼',
          name: 'confirm password',
          as: 'input',
          type: 'password',
          rules: 'required|confirmed:@password',
        },
      ],
    };
  },
  methods: {
    signup() {
      this.$router.push('/product_list/all');
    },
  },
};
</script>
