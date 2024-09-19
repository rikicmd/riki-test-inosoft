<template>
    <button
        class="bg-primary-white2 border-primary-grey border text-white py-2 px-4 rounded w-full"
        @click="$emit('click')"
    >
        <div>
            <div class="flex justify-between items-center">
                <div class="text-primary-blue text-xs">{{ label }}</div>
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
            <div class="flex justify-between items-center">
                <div class="text-primary-orange text-sm font-bold">
                    {{ selectedData?.text || "All" }}
                </div>
                <div
                    v-if="selectedData"
                    class="w-4 h-4 cursor-pointer"
                    @click="$emit('remove')"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        fill="#a6afb7"
                    >
                        <path
                            d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"
                        />
                    </svg>
                </div>
            </div>
        </div>
    </button>
</template>

<script>
export default {
    name: "DropdownButton",
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
