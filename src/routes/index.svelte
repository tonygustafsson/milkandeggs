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

	const clear = () => {
		const newItems = $currentItems;
		Object.values(newItems).forEach((item) => (item.done = true));
		currentItems.set(newItems);
	};
</script>

<svelte:head>
	<title>Lista</title>
</svelte:head>

<section>
	<h1>Inköpslistan</h1>

	<div class="button-panel">
		<a href="" on:click={clear}>Allt klart</a>
	</div>

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
					<label class:done={item.done} for={item.name}>{item.name}</label>
				</p>
			{/each}
		{/if}
	{/each}

	{#if Object.values($currentItems).length < 1}
		<p><em>Inköpslistan är tom.</em></p>
	{/if}
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
	.button-panel {
		text-align: right;
		width: 100%;
		margin-bottom: 2em;
	}
</style>
