<template>
    <div class="flex justify-center mt-4">
        <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-4 py-2 bg-gray-300 text-gray-800 rounded-l"
        >
            Prev
        </button>
        <span class="px-4 py-2 text-gray-800">
            Page {{ currentPage }} of {{ totalPages }}
        </span>
        <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 bg-gray-300 text-gray-800 rounded-r"
        >
            Next
        </button>
    </div>
</template>

<script>
export default {
    name: "Pagination",
    props: {
        currentPage: {
            type: Number,
            required: true,
        },
        totalItems: {
            type: Number,
            required: true,
        },
        itemsPerPage: {
            type: Number,
            default: 10,
        },
    },
    computed: {
        totalPages() {
            return Math.ceil(this.totalItems / this.itemsPerPage);
        },
    },
    methods: {
        prevPage() {
            if (this.currentPage > 1) {
                this.$emit("update:currentPage", this.currentPage - 1);
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.$emit("update:currentPage", this.currentPage + 1);
            }
        },
    },
};
</script>

<style scoped>
button:disabled {
    background-color: #e2e8f0;
    cursor: not-allowed;
}
</style>
