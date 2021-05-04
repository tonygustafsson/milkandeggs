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

<script>
	import categories from '../data/categories.json';
	import { items } from '../stores/items.js';

	$: getMatchingCategoryItems = (categoryId) =>
		Object.values($items).filter((x) => x.categoryId == categoryId);
	$: categoryHasItems = (categoryId) =>
		Object.values($items).find((x) => x.categoryId == categoryId);

	const addToCurrentList = (e) => {
		const active = e.target.checked;
		const id = e.target.id;
		const item = Object.values($items).find((x) => x.name === id);

		item.active = active;
		item.done = !active;
		items.set($items);
	};

	const clear = () => {
		Object.values($items).forEach((x) => (x.active = false));
		items.set($items);
	};

	const increaseQuantity = () => {
		alert('increiase');
	};

	const decreaseQuantity = () => {
		alert('decrease');
	};
</script>

<svelte:head>
	<title>Planera</title>
</svelte:head>

<div class="content">
	<h1>Planera</h1>

	<div class="button-panel">
		<a href="" on:click={clear}>Töm listan</a>
	</div>

	{#each categories as category, categoryId}
		<h3>{category}</h3>

		{#if categoryHasItems(categoryId)}
			{#each getMatchingCategoryItems(categoryId) as item}
				<p>
					<input
						on:change={addToCurrentList}
						type="checkbox"
						name={item.name}
						data-categoryId={categoryId}
						id={item.name}
						checked={$items.hasOwnProperty(item.name) && $items[item.name].active}
					/>
					<label for={item.name}>
						{item.name}
					</label>

					<button data-item-id={item.name} on:click={increaseQuantity}>+</button>
					<span>{item.quantity}</span>
					<button data-item-id={item.name} on:click={decreaseQuantity}>-</button>
				</p>
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
	label {
		user-select: none;
	}
</style>
