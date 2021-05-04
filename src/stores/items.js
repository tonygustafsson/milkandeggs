import { writable, derived } from 'svelte/store';

let storedItems = {};

if (typeof window !== 'undefined') {
	const storedItemsFromStorage = window.localStorage.getItem('items');
	storedItems = storedItemsFromStorage ? JSON.parse(storedItemsFromStorage) : storedItems;
}

export const items = writable(storedItems);

items.subscribe((value) => {
	if (typeof window !== 'undefined') {
		window.localStorage.setItem('items', JSON.stringify(value));
	}
});

export const itemsArray = derived(items, ($items) => Object.values($items));
