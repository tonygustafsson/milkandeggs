<script context="module">
	export const prerender = true;
</script>

<script lang="typescript">
	import { onMount } from 'svelte';
	import { settings } from '../stores/settings';
	import { goto } from '$app/navigation';
	import { items, itemsArray } from '../stores/items';
	import { categoriesArray } from '../stores/categories';
	import Button from '$lib/button.svelte';
	import IconDone from '$lib/icons/done.svelte';
	import IconRemove from '$lib/icons/remove.svelte';
	import ListItem from '$lib/list/listItem.svelte';

	onMount(() => {
		if (!$settings.listId) {
			goto('/settings');
		}
	});

	$: getMatchingCategoryItems = (categoryId: string) => {
		return $itemsArray.filter((x) => x.categoryId == categoryId && x.active);
	};
	$: categoryHasItems = (categoryId: string) =>
		$itemsArray.find((x) => x.categoryId == categoryId && x.active);

	const allDone = () => {
		$itemsArray.forEach((item) => (item.done = true));
		items.set($items);
	};

	const clearDone = () => {
		$itemsArray.forEach((item) => {
			if (!item.done) {
				return;
			}

			item.active = false;
			item.comment = '';
			item.quantity = 1;
			item.done = false;
		});
		items.set($items);
	};
</script>

<svelte:head>
	<title>Lista</title>
</svelte:head>

<section>
	<div class="button-panel">
		<Button on:click={allDone}>
			<IconDone />
			Allt klart
		</Button>

		<Button on:click={clearDone}>
			<IconRemove />
			Rensa markerade
		</Button>
	</div>

	<div class="list">
		{#each $categoriesArray as category}
			{#if categoryHasItems(category.id)}
				<h3>{category.name}</h3>

				{#each getMatchingCategoryItems(category.id) as item}
					<ListItem {item} />
				{/each}
			{/if}
		{/each}
	</div>

	{#if $itemsArray.filter((x) => x.active).length === 0}
		<p><em>Inköpslistan är tom.</em></p>
	{/if}
</section>

<style>
	.button-panel {
		text-align: right;
		width: 100%;
		margin-bottom: 2em;
	}
	.list {
		width: 100%;
		margin: 0 auto;
	}
	@media (min-width: 600px) {
		.list {
			width: 50%;
		}
	}
</style>
