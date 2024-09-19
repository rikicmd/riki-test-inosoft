<template>
    <button
        @click.prevent="$emit('click')"
        class="text-gray-700 hover:bg-gray-100 px-2 py-1 rounded-lg flex justify-between items-center w-full text-sm"
    >
        <div>{{ item.text }}</div>
        <div class="text-primary-orange">{{ item.count }}</div>
    </button>
</template>

<script>
export default {
    name: "DropdownItem",
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
};
</script>
