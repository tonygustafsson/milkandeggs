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
	import { items, itemsArray } from '../stores/items';
	import Button from '$lib/button.svelte';
	import PlanningItem from '$lib/planning/item.svelte';

	$: getMatchingCategoryItems = (categoryId: string) =>
		$itemsArray.filter((x) => x.categoryId == categoryId);
	$: categoryHasItems = (categoryId: string) => $itemsArray.find((x) => x.categoryId == categoryId);

	const clear = () => {
		$itemsArray.forEach((x) => ((x.active = false), (x.quantity = 1), (x.comment = '')));
		items.set($items);
	};
</script>

<svelte:head>
	<title>Planera</title>
</svelte:head>

<div class="content">
	<div class="button-panel">
		<Button on:click={clear}>Töm listan</Button>
	</div>

	{#each $categoriesArray as category}
		<h3>{category.name}</h3>

		{#if categoryHasItems(category.id)}
			{#each getMatchingCategoryItems(category.id) as item}
				<PlanningItem {item} />
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
