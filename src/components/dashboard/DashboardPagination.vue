<template>
  <div class="d-flex justify-content-center mt-md-5 mt-3">
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li :class="{ disabled: !paginationData.has_pre }" class="page-item">
          <a
            @click.prevent="updatedPagination(paginationData.current_page - 1)"
            class="page-link"
            href="#"
            aria-label="Previous"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          v-for="page in paginationData.total_pages"
          :key="page"
          :class="{ active: paginationData.current_page === page }"
          class="page-item"
        >
          <a @click.prevent="updatedPagination(page)" class="page-link" href="#">{{ page }}</a>
        </li>
        <li :class="{ disabled: !paginationData.has_next }" class="page-item">
          <a
            @click.prevent="updatedPagination(paginationData.current_page + 1)"
            class="page-link"
            href="#"
            aria-label="Next"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'DashboardPagination',
  props: ['paginationData'],
  methods: {
    updatedPagination(page) {
      this.$emit('getPagination', page);
    },
  },
};
</script>
