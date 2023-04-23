<template>
  <div class="message-alert">
    <div
      class="alert alert-dismissible"
      :class="`alert-${item.apiStatus}`"
      v-for="(item, index) in messages"
      :key="index"
    >
      {{ item.message }}
      <button
        type="button"
        class="btn-close"
        @click="removeMessage(index)"
        aria-label="Close"
      ></button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'AlertMessage',
  computed: {
    ...mapGetters('alertModules', ['messages']),
  },
  methods: {
    removeMessage(index) {
      this.$store.dispatch('alertModules/removeMessage', index);
    },
  },
};
</script>

<style scope>
.message-alert {
  position: fixed;
  max-width: 50%;
  top: 70px;
  right: 35px;
  z-index: 1100;
}
</style>
