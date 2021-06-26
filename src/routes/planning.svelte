<script lang="ts">
	import { onMount } from 'svelte';
	import { settings } from '../stores/settings';
	import { goto } from '$app/navigation';
	import categories from '../data/categories.json';
	import Search from '$lib/planning/search.svelte';
	import { items, itemsArray, itemsFilteredArray, searchValue } from '../stores/items';
	import Button from '$lib/button.svelte';
	import AddItem from '$lib/planning/addItem.svelte';
	import IconClear from '$lib/icons/clear.svelte';
	import { _ } from 'svelte-i18n';
	import { base as basePath } from '$app/paths';
	import PlanningCategory from '$lib/planning/category.svelte';

	onMount(() => {
		if (!$settings.listId) {
			goto('/settings');
		}
	});

	const clearItems = () => {
		$itemsArray.forEach((x) => ((x.active = false), (x.quantity = 1), (x.comment = '')));
		items.set($items);
	};
</script>

<svelte:head>
	<title>{$_('planning.title')} - Milk &amp; Eggs</title>
	<base href={basePath} />
</svelte:head>

<div class="content">
	<div class="button-panel">
		<Button on:click={clearItems}>
			<IconClear />
			{$_('planning.clear')}
		</Button>

		<AddItem />
	</div>

	{#if $itemsArray.length > 20}
		<Search />
		<hr />
	{/if}

	{#if $searchValue !== ''}
		<h3>{$_('planning.search_results')}</h3>
	{/if}

	{#each categories as category}
		<PlanningCategory {category} items={$itemsFilteredArray} isSearchResult={$searchValue !== ''} />
	{/each}

	{#if $searchValue !== '' && $itemsFilteredArray.length < 1}
		<p>{$_('planning.search_no_results')}</p>
	{/if}
</div>

<style>
	.button-panel {
		text-align: right;
		width: 100%;
		margin-bottom: 1em;
	}
	.content {
		width: 100%;
		margin: 0 auto;
	}

	@media (min-width: 600px) {
		.content {
			width: 600px;
		}
	}
</style>
