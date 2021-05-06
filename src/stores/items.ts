import { writable, derived, Writable, Readable } from 'svelte/store';

export type Item = {
	name: string;
	categoryId: string;
	active: boolean;
	done: boolean;
	quantity: number;
	comment: string | undefined;
};

type ItemList = Record<string, Item>;
type ItemListArray = Array<Item>;

let storedItems: ItemList = {};

if (typeof window !== 'undefined') {
	const storedItemsFromStorage = window.localStorage.getItem('items');
	storedItems = storedItemsFromStorage ? JSON.parse(storedItemsFromStorage) : storedItems;
}

export const items: Writable<ItemList> = writable(storedItems);

items.subscribe((value) => {
	if (typeof window !== 'undefined') {
		window.localStorage.setItem('items', JSON.stringify(value));
	}
});

export const itemsArray: Readable<ItemListArray> = derived(items, ($items) =>
	Object.values($items)
);
