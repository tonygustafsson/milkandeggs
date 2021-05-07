<script context="module">
	import { browser, dev } from '$app/env';

	// we don't need any JS on this page, though we'll load
	// it in dev so that we get hot module replacement...
	export const hydrate = dev;

	// ...but if the client-side router is already loaded
	// (i.e. we came here from elsewhere in the app), use it
	export const router = browser;

	// since there's no dynamic data here, we can prerender
	// it so that it gets served as a static asset in prod
	export const prerender = true;
</script>

<script lang="typescript">
	import { categoriesArray } from '../stores/categories';
	import { items } from '../stores/items';
	import { goto } from '$app/navigation';
	import Textfield from '$lib/textfield.svelte';
	import Button from '$lib/button.svelte';

	let name;
	let category;

	const createItemIdFromName = (name: string) => {
		let id = name.replace(/\ /g, '-');
		id = id.replace(/å/g, 'a');
		id = id.replace(/Å/g, 'a');
		id = id.replace(/ä/g, 'a');
		id = id.replace(/ä/g, 'a');
		id = id.replace(/ö/g, 'o');
		id = id.replace(/Ö/g, 'o');
		id = id.toLowerCase();
		id = id.replace(/[^0-9a-z-]/gi, '');

		return id;
	};

	const addItem = () => {
		const newItemId = createItemIdFromName(name.value);

		$items[newItemId] = {
			id: newItemId,
			name: name.value,
			categoryId: category.value,
			active: false,
			done: false,
			quantity: 1,
			comment: ''
		};

		items.set($items);

		goto('/edit-items');
	};
</script>

<svelte:head>
	<title>Lägg till vara</title>
</svelte:head>

<div class="content">
	<h2>Lägg till vara</h2>

	<form>
		<Textfield type="text" name="name" bind:this={name} />

		<select bind:this={category}>
			{#each $categoriesArray as category}
				<option value={category.id}>{category.name}</option>
			{/each}
		</select>

		<Button type="button" on:click={addItem}>Spara</Button>
	</form>
</div>

<style>
</style>
