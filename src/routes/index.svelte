<script context="module">
	export const prerender = true;
</script>

<script>
	import { items } from '../stores/items.js';
	import categories from '../data/categories.json';

	$: getMatchingCategoryItems = (categoryId) => {
		return Object.values($items).filter((x) => x.categoryId == categoryId && x.active);
	};
	$: categoryHasItems = (categoryId) =>
		Object.values($items).find((x) => x.categoryId == categoryId && x.active);

	const checkItem = (e) => {
		$items[e.target.name].done = e.target.checked;
		items.set($items);
	};

	const clear = () => {
		Object.values($items).forEach((item) => (item.done = true));
		items.set($items);
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
						checked={$items.hasOwnProperty(item.name) && $items[item.name].done}
					/>
					<label class:done={item.done} for={item.name}>{item.name}</label>
				</p>
			{/each}
		{/if}
	{/each}

	{#if Object.values($items).filter((x) => !x.active).length < 1}
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
