<script lang="ts">
	import { onMount } from 'svelte';
	import PlanningItem from '$lib/planning/planningItem.svelte';
	import { _ } from 'svelte-i18n';
	import type Item from '../../types/item';

	export let category = '';
	export let isSearchResult = false;
	export let items: Item[] = [];

	$: visible = false;
	let categoryElement;

	onMount(() => {
		const observer = new IntersectionObserver((entries) => {
			if (entries[0].intersectionRatio > 0) {
				visible = true;
				observer.unobserve(categoryElement);
			}
		});

		observer.observe(categoryElement);
	});

	$: getMatchingCategoryItems = (categoryId: string) =>
		items.filter((x) => x.categoryId === categoryId);
	$: categoryHasItems = (categoryId: string) => items.some((x) => x.categoryId == categoryId);
</script>

<div class:invisible={!visible} bind:this={categoryElement}>
	{#if !isSearchResult}
		<h3>{$_(`categories.${category}`)}</h3>
	{/if}

	{#if visible}
		{#if categoryHasItems(category)}
			<table>
				{#each getMatchingCategoryItems(category) as item}
					<PlanningItem {item} />
				{/each}
			</table>
		{:else if !isSearchResult}
			<p>
				<em>{$_('planning.no_items_under_category')}</em>
			</p>
		{/if}
	{/if}
</div>

<style>
	table {
		border-spacing: 0;
		width: 100%;
		margin: 0 auto;
	}

	.invisible {
		min-height: 500px;
	}

	@media (max-width: 600px) {
		table {
			table-layout: fixed;
		}
	}
</style>
