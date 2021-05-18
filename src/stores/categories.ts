import { readable, Readable } from 'svelte/store';
import categoriesData from '../data/categories.json';
import type Category from '../types/category';

type CategoryList = Array<Category>;

const initCategories = [];

categoriesData.forEach((categoryId) => {
	initCategories.push({
		id: categoryId
	});
});

export const categories: Readable<CategoryList> = readable(null, (set) => {
	set(initCategories);
});
