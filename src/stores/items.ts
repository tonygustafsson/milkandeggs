import { writable, derived, Writable, Readable } from 'svelte/store';
import type Item from '../types/item';
import { settings } from './settings';
import firebaseConfig from '../../firebase.config.json';

type ItemList = Record<string, Item>;
type ItemListArray = Array<Item>;

let listId = null;

// Create the empty store
export const items: Writable<ItemList> = writable({});

// Create a dirived store that is an array instead of an object, easier to loop through
export const itemsArray: Readable<ItemListArray> = derived(
	items,
	($items) => ($items && Object.values($items)) || []
);

export const searchValue: Writable<string> = writable('');

// Create a readable list of filtered items based on searchValue
export const itemsFilteredArray: Readable<ItemListArray> = derived(
	[itemsArray, searchValue],
	([$itemsArray, $searchValue]) => {
		const filteredItems = $itemsArray.filter((item) =>
			item.name.toLowerCase().includes($searchValue)
		);
		return filteredItems;
	}
);

Promise.all([import('firebase/app'), import('firebase/database'), import('firebase/auth')])
	.then((x) => x[0].default)
	.then((firebase) => {
		if (!firebase.apps.length) {
			firebase.initializeApp(firebaseConfig);
		}

		// Fetch changes to settings store to get list ID
		settings.subscribe((value) => {
			if (!value.listId) {
				// Do not save empty list IDs
				return;
			}

			listId = value.listId;

			// Fetch data from Firebase and listen for updates
			const storedItemsTable = firebase.database().ref(listId);

			storedItemsTable.on('value', (snapshot) => {
				items.set(snapshot.val());
			});

			return () => {
				storedItemsTable.off('value');
			};
		});

		firebase
			.auth()
			.signInAnonymously()
			.then(() => {
				// Fetch changes to store and save it to Firebase
				items.subscribe((value) => {
					if (value && Object.keys(value).length <= 0) {
						// Do not save empty set, from startup
						return;
					}

					if (listId) {
						firebase.database().ref(listId).set(value);
					}
				});
			})
			.catch((err) => {
				console.log('Could not authorize against the database.', err);
			});
	});
