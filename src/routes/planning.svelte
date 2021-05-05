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

<script lang="typescript">
	import categories from '../data/categories.json';
	import { items, itemsArray } from '../stores/items';

	$: getMatchingCategoryItems = (categoryId: number) =>
		$itemsArray.filter((x) => x.categoryId == categoryId);
	$: categoryHasItems = (categoryId: number) => $itemsArray.find((x) => x.categoryId == categoryId);

	const addToCurrentList = (e: any) => {
		const active = e.target.checked;
		const id = e.target.id;
		const item = $itemsArray.find((x) => x.name === id);

		item.active = active;
		item.done = !active;
		item.quantity = 1;
		items.set($items);
	};

	const clear = () => {
		$itemsArray.forEach((x) => ((x.active = false), (x.quantity = 1), (x.comment = '')));
		items.set($items);
	};

	const increaseQuantity = (e) => {
		const id = e.target.getAttribute('data-item-id');
		const item = $itemsArray.find((x) => x.name === id);

		item.quantity++;
		items.set($items);
	};

	const decreaseQuantity = (e) => {
		const id = e.target.getAttribute('data-item-id');
		const item = $itemsArray.find((x) => x.name === id);

		if (item.quantity < 2) {
			return;
		}

		item.quantity--;
		items.set($items);
	};

	const comment = (e) => {
		const id = e.target.getAttribute('data-item-id');
		const item = $itemsArray.find((x) => x.name === id);

		item.comment = e.target.value;
		items.set($items);
	};
</script>

<svelte:head>
	<title>Planera</title>
</svelte:head>

<div class="content">
	<h1>Planera</h1>

	<div class="button-panel">
		<button on:click={clear}>Töm listan</button>
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
						checked={Object.prototype.hasOwnProperty.call($items, item.name) &&
							$items[item.name].active}
					/>
					<label for={item.name}>
						{item.name}
					</label>

					<button disabled={!item.active} data-item-id={item.name} on:click={increaseQuantity}
						>+</button
					>
					<span>{item.quantity}</span>
					<button disabled={!item.active} data-item-id={item.name} on:click={decreaseQuantity}
						>-</button
					>
					<input
						disabled={!item.active}
						data-item-id={item.name}
						value={item.comment || ''}
						type="text"
						placeholder="Kommentar"
						on:change={comment}
					/>
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
