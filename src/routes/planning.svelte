<script lang="ts">
	import { onMount } from 'svelte';
	import { settings } from '../stores/settings';
	import { goto } from '$app/navigation';
	import categories from '../data/categories.json';
	import { items, itemsArray } from '../stores/items';
	import Button from '$lib/button.svelte';
	import PlanningItem from '$lib/planning/planningItem.svelte';
	import AddItem from '$lib/planning/addItem.svelte';
	import IconClear from '$lib/icons/clear.svelte';
	import { _ } from 'svelte-i18n';
	import { base as basePath } from '$app/paths';

	onMount(() => {
		if (!$settings.listId) {
			goto('/settings');
		}
	});

	$: getMatchingCategoryItems = (categoryId: string) =>
		$itemsArray.filter((x) => x.categoryId === categoryId);
	$: categoryHasItems = (categoryId: string) => $itemsArray.some((x) => x.categoryId == categoryId);

	const clear = () => {
		$itemsArray.forEach((x) => ((x.active = false), (x.quantity = 1), (x.comment = '')));
		items.set($items);
	};
</script>

<svelte:head>
	<title>{$_('planning.title')}</title>
	<base href={basePath} />
</svelte:head>

<div class="content">
	<div class="button-panel">
		<Button on:click={clear}>
			<IconClear />
			{$_('planning.clear')}
		</Button>

		<AddItem />
	</div>

	{#each categories as category}
		<h3>{$_(`categories.${category}`)}</h3>

		{#if categoryHasItems(category)}
			<table>
				{#each getMatchingCategoryItems(category) as item}
					<PlanningItem {item} />
				{/each}
			</table>
		{:else}
			<p>
				<em>{$_('planning.no_items_under_category')}</em>
			</p>
		{/if}
	{/each}
</div>

<style>
	table {
		border-spacing: 0;
		width: 100%;
		margin: 0 auto;
	}
	.button-panel {
		text-align: right;
		width: 100%;
		margin-bottom: 2em;
	}
	.content {
		width: 600px;
		margin: 0 auto;
	}
	@media (max-width: 600px) {
		table {
			table-layout: fixed;
		}
		.content {
			width: auto;
		}
	}
</style>
