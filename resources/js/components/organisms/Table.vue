<template>
    <div class="overflow-x-auto">
        <table class="table-auto w-full border-collapse border border-gray-300">
            <thead>
                <tr>
                    <th
                        v-for="(column, index) in columns"
                        :key="index"
                        class="border px-4 py-2 bg-gray-100"
                    >
                        {{ column.label }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="data.length === 0">
                    <td
                        :colspan="columns.length"
                        class="border px-4 py-2 text-center"
                    >
                        Tidak ada data
                    </td>
                </tr>
                <tr
                    v-for="(row, rowIndex) in data"
                    :key="rowIndex"
                    class="text-center"
                >
                    <td
                        v-for="(column, colIndex) in columns"
                        :key="colIndex"
                        class="border px-4 py-2"
                    >
                        <slot :name="column.field" :row="row">{{
                            row[column.field]
                        }}</slot>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: "Table",
    props: {
        columns: {
            type: Array,
            required: true,
        },
        data: {
            type: Array,
            required: true,
        },
    },
};
</script>

<style scoped>
.table-auto {
    width: 100%;
    border-collapse: collapse;
}
</style>
