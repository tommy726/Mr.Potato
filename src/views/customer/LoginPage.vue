<template>
  <div class="container my-8 py-xxl-8">
    <div class="row justify-content-center">
      <div class="col-xxl-3 col-lg-4 col-sm-7 col">
        <div class="card">
          <div class="card-header text-center bg-warning">
            <h2 class="h3 mb-0">登入</h2>
          </div>
          <div class="card-body p-5">
            <Form @submit="signIn" v-slot="{ meta }">
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
                Submit
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      user: [
        {
          label: '信箱',
          name: 'username',
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
      ],
    };
  },
  methods: {
    signIn(values) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`;
      vm.$http.post(api, values).then((response) => {
        if (response.data.success) {
          vm.setTokenCookie(response.data.token, response.data.expired);
          vm.$router.push('/admin/products');
        } else {
          const { message } = response.data;
          const status = response.data.success;
          vm.$store.dispatch('alertModules/updateMessage', { message, status });
        }
      });
    },
    setTokenCookie(token, expired) {
      document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
    },
  },
};
</script>
