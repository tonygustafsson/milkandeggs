import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type Settings from '../types/settings';

const localStorageKey = 'settings';

let initSettings = {
	listId: null,
	language: 'en'
};

if (typeof window !== 'undefined' && typeof window.localStorage === 'object') {
	const settingsFromLocalStorage = window.localStorage.getItem(localStorageKey);
	initSettings = settingsFromLocalStorage ? JSON.parse(settingsFromLocalStorage) : initSettings;
}

// Create the empty store
export const settings: Writable<Settings> = writable(initSettings);

// Fetch changes to store and save it to LocalStorage
settings.subscribe((value) => {
	if (Object.keys(value).length <= 0) {
		// Do not save empty set, from startup
		return;
	}

	if (typeof window !== 'undefined' && typeof window.localStorage === 'object') {
		window.localStorage.setItem(localStorageKey, JSON.stringify(value));
	}
});
