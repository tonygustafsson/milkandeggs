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

<script>
	import categories from '../data/categories.json';
	import { items } from '../stores/items.js';
	import { goto } from '$app/navigation';

	let name;
	let category;

	const addItem = () => {
		$items.push({
			name: name.value,
			category: category.value
		});
		items.set($items);

		goto('/edit-items');
	};
</script>

<svelte:head>
	<title>Lägg till vara</title>
</svelte:head>

<div class="content">
	<h1>Lägg till vara</h1>

	<form>
		<input type="text" name="name" bind:this={name} />

		<select bind:this={category}>
			{#each categories as category, key}
				<option value={key}>{category}</option>
			{/each}
		</select>

		<button type="button" on:click={() => addItem()}>Spara</button>
	</form>
</div>

<style>
</style>
