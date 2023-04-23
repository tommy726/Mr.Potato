<template>
  <div class="d-inline">
    <button @click="openModal" type="button" class="btn btn-outline-danger ms-2">刪除</button>
    <div
      class="modal fade"
      id="removeModal"
      tabindex="-1"
      aria-labelledby="removeModalLabel"
      aria-hidden="true"
      ref="removeModal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h1 class="modal-title fs-5" id="removeModalLabel">刪除</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body py-6 text-start">
            確定要刪除 <strong class="text-primary">{{ data.title }}</strong>？
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
              取消
            </button>
            <button @click="removeData" type="button" class="btn btn-outline-danger">
              確定刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';

export default {
  name: 'RemoveModal',
  props: ['data'],
  methods: {
    openModal() {
      this.removeModal.show();
    },
    removeData() {
      this.$emit('remove');
      this.removeModal.hide();
    },
  },
  mounted() {
    const vm = this;
    vm.removeModal = new Modal(vm.$refs.removeModal);
  },
};
</script>
