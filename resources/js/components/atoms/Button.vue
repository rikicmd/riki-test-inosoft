<template>
    <button
        type="button"
        class="border px-4 py-2 rounded-lg text-sm text-primary-blue4"
        :class="classname"
        @click="$emit('click')"
    >
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: "Button",
    props: {
        classname: {
            type: String,
        },
    },
};
</script>
