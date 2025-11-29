/**
 * @typedef { "eq" | "ne" | "gt" | "gte" | "lt" | "lte" } FilterOperator
 */

/**
 * @typedef {Object} Filter
 * @property {"price" | "count"} field - фильтруемое поле
 * @property {FilterOperator} operator - тип операции
 * @property {number} value - значение для фильтрации
 */

/**
 * @typedef {Object} Sorter
 * @property {"title" | "price" | "count"} field - сортируемое поле
 * @property {"asc" | "desc"} direction - направление сортировки
 */

/**
 * @typedef {Object} Paginator
 * @property {10 | 15 | 20} limit - число записей для выдачи
 * @property {number} page - текущая страница
 */

/**
 * @typedef {Object} State
 * @property {Paginator} paginate - объект со свойствами пагинации
 * @property {Sorter[]} sorters - массив сортировщиков
 * @property {Filter[]} filters - массив фильтров
 */

export { }