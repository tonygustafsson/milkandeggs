import { writable, derived, Writable, Readable } from 'svelte/store';
import categoriesData from '../data/categories.json';
import type Category from '../types/category';

type CategoryList = Record<string, Category>;
type CategoryListArray = Array<Category>;

export const categories: Writable<CategoryList> = writable(categoriesData);

export const categoriesArray: Readable<CategoryListArray> = derived(categories, ($categories) =>
	Object.values($categories)
);
