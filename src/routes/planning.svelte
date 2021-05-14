<script lang="typescript">
	import { onMount } from 'svelte';
	import { settings } from '../stores/settings';
	import { goto } from '$app/navigation';
	import { categories } from '../stores/categories';
	import { items, itemsArray } from '../stores/items';
	import Button from '$lib/button.svelte';
	import PlanningItem from '$lib/planning/planningItem.svelte';
	import AddItem from '$lib/planning/addItem.svelte';
	import IconClear from '$lib/icons/clear.svelte';
	import { _ } from 'svelte-i18n';

	onMount(() => {
		if (!$settings.listId) {
			goto('/settings');
		}
	});

	$: getMatchingCategoryItems = (categoryId: string) =>
		$itemsArray.filter((x) => x.categoryId == categoryId);
	$: categoryHasItems = (categoryId: string) => $itemsArray.find((x) => x.categoryId == categoryId);

	const clear = () => {
		$itemsArray.forEach((x) => ((x.active = false), (x.quantity = 1), (x.comment = '')));
		items.set($items);
	};
</script>

<svelte:head>
	<title>{$_('planning.title')}</title>
</svelte:head>

<div class="content">
	<div class="button-panel">
		<Button on:click={clear}>
			<IconClear />
			{$_('planning.clear')}
		</Button>

		<AddItem />
	</div>

	<div class="list">
		{#each $categories as category}
			<h3>{category.name}</h3>

			{#if categoryHasItems(category.id)}
				{#each getMatchingCategoryItems(category.id) as item}
					<PlanningItem {item} />
				{/each}
			{:else}
				<p><em>{$_('planning.no_items_under_category')}</em></p>
			{/if}
		{/each}
	</div>
</div>

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
