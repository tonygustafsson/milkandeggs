<script context="module">
	export const prerender = true;
</script>

<script>
	import { currentItems } from '../stores/currentItems.js';
	import categories from '../data/categories.json';

	$: getMatchingCategoryItems = (categoryId) => {
		return Object.values($currentItems).filter((x) => x.categoryId == categoryId);
	};
	$: categoryHasItems = (categoryId) =>
		Object.values($currentItems).find((x) => x.categoryId == categoryId);

	const checkItem = (e) => {
		const newItems = $currentItems;
		newItems[e.target.name].done = e.target.checked;
		currentItems.set(newItems);
	};
</script>

<svelte:head>
	<title>Inköpslistan</title>
</svelte:head>

<section>
	<h1>Inköpslistan</h1>

	{#each categories as category, categoryId}
		{#if categoryHasItems(categoryId)}
			<h3>{category}</h3>

			{#each getMatchingCategoryItems(categoryId) as item}
				<p>
					<input
						on:change={checkItem}
						type="checkbox"
						name={item.name}
						class="checkbox"
						id={item.name}
						checked={$currentItems.hasOwnProperty(item.name) && $currentItems[item.name].done}
					/>
					<label class:done={!item.done} for={item.name}>{item.name}</label>
				</p>
			{/each}
		{/if}
	{/each}
</section>

<style>
	.done {
		text-decoration: line-through;
	}
	.checkbox {
		display: none;
	}
	label {
		user-select: none;
	}
</style>
