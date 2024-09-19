import axiosInstance from "../../utils/axios";

function countByKey(product, key, count) {
    const keyValue = product[key];
    const findData = count.find((c) => c.value === keyValue)
    if (findData) {
        findData.count += 1;
    } else {
        count.push({
            value: keyValue,
            count: 0,
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
    options: {
        country: [],
        product_type: [],
        grade: [],
        connection: [],
        size: []
    }
}

const mutations = {
    SET_PRODUCTS(state, products) {
        state.products = products
    },
    SET_OPTIONS(state, options) {
        state.options = options
    },
}

const actions = {
    async fetchProducts({ commit, state }) {
        try {
            const response = await axiosInstance.get("/api/products");
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

        } catch (error) {

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
    }
}



export default {
    namespaced: true,
    state,
    mutations,
    actions,
};