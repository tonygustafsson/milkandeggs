import { readable, Readable, get } from 'svelte/store';
import categoriesData from '../data/categories.json';
import type Category from '../types/category';
import { _ } from 'svelte-i18n';

type CategoryList = Array<Category>;

const $_ = get(_);
const initCategories = [];

categoriesData.forEach((categoryId) => {
	initCategories.push({
		id: categoryId,
		name: $_(`categories.${categoryId}`)
	});
});

export const categories: Readable<CategoryList> = readable(null, (set) => {
	set(initCategories);
});
