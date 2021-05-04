import { writable } from 'svelte/store';

let storedCurrentItems;

if (typeof window !== 'undefined') {
	storedCurrentItems = window.localStorage.getItem('current_items');
	storedCurrentItems = JSON.parse(storedCurrentItems) || {};
} else {
	storedCurrentItems = {};
}

export const currentItems = writable(storedCurrentItems);

currentItems.subscribe((value) => {
	if (typeof window !== 'undefined') {
		window.localStorage.setItem('current_items', JSON.stringify(value));
	}
});
