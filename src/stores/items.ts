import { writable, derived, Writable, Readable } from 'svelte/store';
import type Item from '../types/item';
import { settings } from './settings';
import { browser } from '$app/env';

type ItemList = Record<string, Item>;
type ItemListArray = Array<Item>;

// Setup Firebase
const firebaseConfig = {
	apiKey: 'AIzaSyApxLOuQ3nldNpk4ZRe_uvoaV_86JOVx98',
	authDomain: 'shopdrop-51322.firebaseapp.com',
	databaseURL: 'https://shopdrop-51322-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'shopdrop-51322',
	storageBucket: 'shopdrop-51322.appspot.com',
	messagingSenderId: '543806112650',
	appId: '1:543806112650:web:d9bd7db712f1da07c8fe73'
};

let listId = null;

// Create the empty store
export const items: Writable<ItemList> = writable({});

if (browser) {
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
		});
} else {
	Promise.all([import('@firebase/app'), import('@firebase/database'), import('@firebase/auth')])
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
		});
}

// Create a dirived store that is an array instead of an object, easier to loop through
export const itemsArray: Readable<ItemListArray> = derived(
	items,
	($items) => ($items && Object.values($items)) || []
);
