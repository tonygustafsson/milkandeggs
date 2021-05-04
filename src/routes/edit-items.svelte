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

	$: getMatchingCategoryItems = (categoryId) => $items.filter((x) => x.category == categoryId);
	$: categoryHasItems = (categoryId) => $items.find((x) => x.category == categoryId);

	const deleteItem = (item, e) => {
		e.preventDefault();

		let newItems = $items;
		newItems = newItems.filter((x) => x.name !== item);
		items.set(newItems);
	};
</script>

<svelte:head>
	<title>Varor</title>
</svelte:head>

<div class="content">
	<h1>Varor</h1>

	<div class="button-panel">
		<a href="/add-item">Lägg till vara</a>
	</div>

	{#each categories as category, categoryId}
		<h3>{category}</h3>

		{#if categoryHasItems(categoryId)}
			{#each getMatchingCategoryItems(categoryId) as item}
				<p>
					{item.name}
					<a href="#" on:click={(e) => deleteItem(item.name, e)}>Ta bort</a>
				</p>
			{/each}
		{:else}
			<p><em>Inga varor under denna kategori ännu.</em></p>
		{/if}
	{/each}
</div>

<style>
	.button-panel {
		text-align: right;
		width: 100%;
		margin-bottom: 2em;
	}
</style>
