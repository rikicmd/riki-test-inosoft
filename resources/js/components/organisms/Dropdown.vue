<template>
    <div ref="dropdown" class="relative inline-block text-left w-full">
        <DropdownButton
            @click="toggleMenu"
            @remove="removeSelected"
            :label="label"
            :isOpen="isOpen"
            :selectedData="selected"
            v-if="!type"
        />
        <DropdownButtonCategory
            @click="toggleMenu"
            :label="label"
            :isOpen="isOpen"
            :selectedData="selected"
            v-if="type === 'category'"
        />
        <DropdownMenu v-if="isOpen" class="py-2 px-4">
            <div class="text-sm text-primary-blue2 mb-2">
                Select a <span class="font-bold">{{ label }}</span> below
            </div>
            <DropdownSearch
                v-if="searchable"
                @update:modelValue="updateSearchQuery"
            />
            <div
                class="flex mt-2 flex-col gap-2 max-h-[200px] overflow-y-scroll overflow-x-hidden"
            >
                <DropdownItem
                    v-for="item in filteredItems"
                    :key="item.value"
                    :item="item"
                    @click="selectItem({ item, name })"
                />
            </div>
        </DropdownMenu>
    </div>
</template>

<script>
import DropdownButton from "../atoms/DropdownButton.vue";
import DropdownButtonCategory from "../atoms/DropdownButtonCategory.vue";
import DropdownItem from "../atoms/DropdownItem.vue";
import DropdownMenu from "../molecules/DropdownMenu.vue";
import DropdownSearch from "../molecules/DropdownSearch.vue";

export default {
    components: {
        DropdownButton,
        DropdownMenu,
        DropdownItem,
        DropdownSearch,
        DropdownButtonCategory,
    },
    props: {
        label: {
            type: String,
            default: "Dropdown",
        },
        items: {
            type: Array,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        selected: {
            type: Object,
        },
        type: {
            type: String,
        },
        searchable: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            isOpen: false,
            searchQuery: "",
        };
    },
    computed: {
        filteredItems() {
            return this.items.filter((item) =>
                item.text.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },
    },
    methods: {
        toggleMenu() {
            this.isOpen = !this.isOpen;
        },
        selectItem(item) {
            this.$emit("item-selected", item);
            this.isOpen = false;
        },
        removeSelected() {
            this.$emit("remove-selected", this.name);
        },
        handleClickOutside(event) {
            const dropdown = this.$refs.dropdown;
            if (dropdown && !dropdown.contains(event.target)) {
                this.isOpen = false;
            }
        },
        updateSearchQuery(newVal) {
            this.searchQuery = newVal;
        },
    },
    mounted() {
        document.addEventListener("click", this.handleClickOutside);
    },
    beforeDestroy() {
        document.removeEventListener("click", this.handleClickOutside);
    },
};
</script>
