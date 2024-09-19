<template>
    <div>
        <div class="container mx-auto py-4">
            <div class="flex justify-between items-center">
                <div class="hidden lg:block">
                    <img src="/images/pipesales.svg" />
                </div>
                <div
                    class="flex items-center justify-between gap-2 w-full lg:w-auto px-10 lg:px-0"
                >
                    <Button class="hidden lg:block">About Pipesales</Button>
                    <Button class="hidden lg:block">OCTG Marketplace</Button>
                    <Button class="hidden lg:block">Blog</Button>
                    <Button class="bg-primary-blue4 !text-white !border-none">
                        Search Pipesales
                    </Button>
                    <Button class="bg-primary-blue4 !text-white !border-none">
                        Sell My Pipes
                    </Button>
                    <Button class="bg-primary-orange !text-white !border-none">
                        Enquire Now
                    </Button>
                </div>
            </div>
        </div>
        <div
            class="bg-primary-500 bg-[url('/images/header-background-2.webp')] bg-cover"
        >
            <div class="container mx-auto relative pb-40 pt-10 md:py-10">
                <div
                    class="text-white flex px-4 items-start lg:items-center lg:gap-20"
                >
                    <img src="/images/tomi-full.webp" class="hidden md:block" />
                    <div
                        class="flex flex-col md:gap-2 font-bold text-2xl md:text-6xl"
                    >
                        <h1>Your global marketplace to</h1>
                        <div class="text-orange-500">
                            buy & sell tubular products
                        </div>
                        <div class="text-sm md:text-lg font-normal mt-4">
                            Quickly overcome supply gaps and target zero
                            inventory with Pipesales.
                        </div>
                    </div>
                </div>

                <div class="absolute -bottom-80 lg:-bottom-10 w-full">
                    <div class="flex items-center justify-between">
                        <div class="w-[500px] relative">
                            <div
                                class="border-r-[50px] w-full -bottom-3 lg:bottom-0 border-b-[80px] lg:border-b-[65px] border-transparent border-b-white rounded-tl-lg absolute"
                            ></div>
                            <div class="px-4 pr-20 hidden md:block">
                                <Dropdown
                                    :items="countryOptions"
                                    @item-selected="handleItemSelected"
                                    label="Country"
                                    name="country_name"
                                    :selected="selected.country_name"
                                    type="category"
                                    :searchable="false"
                                />
                            </div>

                            <div class="px-4 pr-20 md:hidden">
                                <Dropdown
                                    :items="countryOptions"
                                    @item-selected="handleItemSelected"
                                    label="Category"
                                    name="country_name"
                                    :selected="selected.country_name"
                                    :searchable="false"
                                />
                            </div>
                        </div>
                        <HowtoBuy />
                    </div>
                    <div
                        class="w-full flex flex-col lg:flex-row items-center gap-4 justify-between bg-white p-4 shadow rounded-bl-lg rounded-r-lg"
                    >
                        <Dropdown
                            :items="productTypeOptions"
                            @item-selected="handleItemSelected"
                            @remove-selected="handleRemoveSelected"
                            label="Product Type"
                            name="product_type"
                            :selected="selected.product_type"
                        >
                        </Dropdown>
                        <Dropdown
                            :items="sizeOptions"
                            @item-selected="handleItemSelected"
                            @remove-selected="handleRemoveSelected"
                            label="Size"
                            name="size"
                            :selected="selected.size"
                        >
                        </Dropdown>
                        <Dropdown
                            :items="gradeOptions"
                            @item-selected="handleItemSelected"
                            @remove-selected="handleRemoveSelected"
                            label="Grade"
                            name="grade"
                            :selected="selected.grade"
                        >
                        </Dropdown>
                        <Dropdown
                            :items="connectionOptions"
                            @item-selected="handleItemSelected"
                            @remove-selected="handleRemoveSelected"
                            label="Connection"
                            name="connection"
                            :selected="selected.connection"
                        >
                        </Dropdown>
                        <Button
                            class="bg-primary-orange w-full justify-center lg:w-[200px] flex items-center font-bold gap-2 h-[55px] !text-white !border-none"
                        >
                            <div class="w-4 h-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                    fill="#fff"
                                >
                                    <path
                                        d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                                    />
                                </svg>
                            </div>
                            <div>Find</div>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Button from "../atoms/Button.vue";
import HowtoBuy from "../molecules/HowtoBuy.vue";
import Dropdown from "../organisms/Dropdown.vue";

export default {
    components: {
        Dropdown,
        Button,
        HowtoBuy,
    },
    mounted() {
        this.$store.dispatch("products/fetchProducts").then(() => {
            if (this.countryOptions.length > 0) {
                this.selected.country_name = this.countryOptions[0];
                this.$store.dispatch("products/updateOptions", {
                    selected: this.selected,
                    keyUpdate: "country",
                });
            }
        });
    },
    computed: {
        countryOptions() {
            return this.$store.state.products.options.country;
        },
        productTypeOptions() {
            return this.$store.state.products.options.product_type;
        },
        gradeOptions() {
            return this.$store.state.products.options.grade;
        },
        connectionOptions() {
            return this.$store.state.products.options.connection;
        },
        sizeOptions() {
            return this.$store.state.products.options.size;
        },
    },
    data() {
        return {
            selected: {},
        };
    },
    methods: {
        handleItemSelected(item) {
            if (item.name === "country_name") {
                this.selected = {};
            }
            this.selected[item.name] = item?.item;
            this.$store.dispatch("products/updateOptions", {
                selected: this.selected,
                keyUpdate: item.name,
            });
        },
        handleRemoveSelected(name) {
            delete this.selected[name];

            this.$store.dispatch("products/updateOptions", {
                selected: this.selected,
                keyUpdate: name,
            });
        },
    },
};
</script>
