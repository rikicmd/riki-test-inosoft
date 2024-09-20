<template>
    <div
        v-if="isLoading"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
        <div class="loader"></div>
    </div>
</template>

<script>
export default {
    name: "Loading",
    props: {
        isLoading: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style scoped>
.loader {
    border: 8px solid rgba(255, 255, 255, 0.3);
    border-top: 8px solid white;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 1.5s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
