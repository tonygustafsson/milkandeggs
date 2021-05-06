import { writable, derived, Writable, Readable } from 'svelte/store';
import categoriesData from '../data/categories.json';

export type Category = {
	id: string;
	name: string;
};

type CategoryList = Record<string, Category>;
type CategoryListArray = Array<Category>;

export const categories: Writable<CategoryList> = writable(categoriesData);

export const categoriesArray: Readable<CategoryListArray> = derived(categories, ($categories) =>
	Object.values($categories)
);
