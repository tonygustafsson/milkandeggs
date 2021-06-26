<script lang="ts">
	import { onMount } from 'svelte';
	import { settings } from '../stores/settings';
	import { goto } from '$app/navigation';
	import { items, itemsArray } from '../stores/items';
	import categories from '../data/categories.json';
	import Button from '$lib/button.svelte';
	import IconDone from '$lib/icons/done.svelte';
	import IconRemove from '$lib/icons/remove.svelte';
	import ListItem from '$lib/list/listItem.svelte';
	import { _ } from 'svelte-i18n';
	import { base as basePath } from '$app/paths';

	onMount(() => {
		if (!$settings.listId) {
			goto('/settings');
		}
	});

	$: getMatchingCategoryItems = (categoryId: string) => {
		return $itemsArray.filter((x) => x.categoryId === categoryId && x.active);
	};
	$: categoryHasItems = (categoryId: string) =>
		$itemsArray.some((x) => x.categoryId == categoryId && x.active);

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
	<title>{$_('list.title')} - Milk &amp; Eggs</title>
	<base href={basePath} />
</svelte:head>

<div class="content">
	<div class="button-panel">
		<Button on:click={allDone}>
			<IconDone />
			{$_('list.all_done')}
		</Button>

		<Button on:click={clearDone}>
			<IconRemove />
			{$_('list.clear_checked')}
		</Button>
	</div>

	{#each Object.values(categories) as category}
		{#if categoryHasItems(category)}
			<h3>{$_(`categories.${category}`)}</h3>

			<table>
				{#each getMatchingCategoryItems(category) as item}
					<ListItem {item} />
				{/each}
			</table>
		{/if}
	{/each}

	{#if $itemsArray.filter((x) => x.active).length === 0}
		<p>
			{$_('list.list_empty')}
		</p>
	{/if}
</div>

<style>
	.button-panel {
		text-align: right;
		width: 100%;
		margin-bottom: 2em;
	}
	table {
		width: 100%;
		margin: 0 auto;
		table-layout: fixed;
		border-spacing: 0;
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
