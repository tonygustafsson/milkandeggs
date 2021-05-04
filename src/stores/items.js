import { writable } from 'svelte/store';

let storedItems;

if (typeof window !== 'undefined') {
	storedItems = window.localStorage.getItem('items');
	storedItems = JSON.parse(storedItems) || [];
} else {
	storedItems = [];
}

export const items = writable(storedItems);

items.subscribe((value) => {
	if (typeof window !== 'undefined') {
		window.localStorage.setItem('items', JSON.stringify(value));
	}
});
