import axiosInstance from "../../utils/axios";

function countByKey(product, key, count) {
    const keyValue = product[key];
    const findData = count.find((c) => c.value === keyValue)
    if (findData) {
        findData.count += 1;
    } else {
        count.push({
            value: keyValue,
            count: 1,
            text: keyValue
        });
    }
}

function resetAllCount(options) {
    options.forEach((option) => {
        option.count = 0
    });
}

const state = {
    products: [],
    productsData: [],
    meta: null,
    options: {
        country: [],
        product_type: [],
        grade: [],
        connection: [],
        size: []
    },
    loading: false,
    errors: null
}

const mutations = {
    SET_PRODUCTS(state, products) {
        state.products = products
    },
    SET_OPTIONS(state, options) {
        state.options = options
    },
    SET_PRODUCTS_DATA(state, productsData) {
        state.productsData = productsData
    },
    SET_LOADING(state, isLoading) {
        state.loading = isLoading;
    },
    SET_ERRORS(state, errors) {
        state.errors = errors;
    },
    SET_META(state, meta) {
        state.meta = meta;
    },
}

const actions = {
    async fetchProducts({ commit, state }) {
        commit("SET_ERRORS", null);
        commit("SET_LOADING", true);
        commit("SET_META", null);
        try {
            const response = await axiosInstance.get("/api/products-all");
            const products = response.data;
            const options = { ...state.options }

            products.forEach(product => {
                countByKey(product, 'country_name', options.country)
                countByKey(product, 'product_type', options.product_type)
                countByKey(product, 'size', options.size)
                countByKey(product, 'grade', options.grade)
                countByKey(product, 'connection', options.connection)
            });

            commit("SET_PRODUCTS", products);
            commit('SET_OPTIONS', options);
            commit('SET_PRODUCTS_DATA', products.filter((p) => p.country_name === options.country[0].value))

        } catch (error) {
            commit("SET_ERRORS", error?.response?.statusText || 'Internal Server Error');
        } finally {
            commit("SET_LOADING", false);
        }
    },
    updateOptions({ commit, state }, {
        selected,
        keyUpdate
    }) {
        const filteredProducts = state.products.filter(product => {
            return Object.entries(selected).every(([key, value]) => {
                return !value || product[key] === value.value;
            });
        });

        const excludeFilter = ["country", keyUpdate]
        const options = { ...state.options }

        Object.entries(options).forEach(([key, value]) => {
            if (!excludeFilter.includes(key)) {
                resetAllCount(value);
            }
        });

        filteredProducts.forEach(product => {
            Object.entries(options).forEach(([key, value]) => {
                if (!excludeFilter.includes(key)) {
                    countByKey(product, key, value);
                }
            });
        });

        commit('SET_OPTIONS', options);
    },
    async fetchProductsData({ commit }, { params }) {
        commit("SET_ERRORS", null);
        commit("SET_LOADING", true);
        try {
            const response = await axiosInstance.get("/api/products", {
                params
            });

            const { data: products, ...meta } = response.data;

            commit("SET_META", meta);
            commit("SET_PRODUCTS_DATA", products);

        } catch (error) {
            commit("SET_ERRORS", error?.response?.statusText || 'Internal Server Error');
        } finally {
            commit("SET_LOADING", false);
        }

    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};