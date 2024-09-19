<template>
    <button
        class="bg-primary-white2 border-primary-grey border text-white py-2 px-4 rounded w-full"
        @click="$emit('click')"
    >
        <div class="flex justify-between items-center">
            <div class="text-primary-blue text-lg">
                I'm looking for...
                <span class="text-primary-orange font-bold">
                    {{ selectedData?.text || "All" }}
                </span>
            </div>

            <div
                class="w-4 h-4 transition-transform duration-300"
                :class="{ 'rotate-180': isOpen }"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#f60"
                    viewBox="0 0 512 512"
                >
                    <path
                        d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
                    />
                </svg>
            </div>
        </div>
    </button>
</template>

<script>
export default {
    name: "DropdownButtonCategory",
    props: {
        label: {
            type: String,
            required: true,
        },
        selectedData: {
            type: Object,
        },
        isOpen: {
            type: Boolean,
            default: false,
        },
    },
};
</script>
