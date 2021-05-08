import firebase from 'firebase/app';
import 'firebase/database';
import { writable, derived, Writable, Readable } from 'svelte/store';
import type Item from '../types/item';

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

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

// Create the empty store
export const items: Writable<ItemList> = writable({});

// Fetch data from Firebase and listen for updates
const storedItemsTable = firebase.database().ref('list');

storedItemsTable.on('value', (snapshot) => {
	items.set(snapshot.val());
});

// Fetch changes to store and save it to Firebase
items.subscribe((value) => {
	if (Object.keys(value).length <= 0) {
		// Do not save empty set, from startup
		return;
	}

	firebase.database().ref('list').set(value);
});

// Create a dirived store that is an array instead of an object, easier to loop through
export const itemsArray: Readable<ItemListArray> = derived(items, ($items) =>
	Object.values($items)
);
