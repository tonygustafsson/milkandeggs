<script context="module">
	export const prerender = true;
</script>

<script lang="typescript">
	import { items, itemsArray } from '../stores/items';
	import { categoriesArray } from '../stores/categories';

	$: getMatchingCategoryItems = (categoryId: string) => {
		return $itemsArray.filter((x) => x.categoryId == categoryId && x.active);
	};
	$: categoryHasItems = (categoryId: string) =>
		$itemsArray.find((x) => x.categoryId == categoryId && x.active);

	const checkItem = (e) => {
		$items[e.target.name].done = e.target.checked;
		items.set($items);
	};

	const clear = () => {
		$itemsArray.forEach((item) => (item.done = true));
		items.set($items);
	};
</script>

<svelte:head>
	<title>Lista</title>
</svelte:head>

<section>
	<h1>Inköpslistan</h1>

	<div class="button-panel">
		<button on:click={clear}>Allt klart</button>
	</div>

	{#each $categoriesArray as category}
		{#if categoryHasItems(category.id)}
			<h3>{category.name}</h3>

			{#each getMatchingCategoryItems(category.id) as item}
				<p>
					<input
						on:change={checkItem}
						type="checkbox"
						name={item.name}
						class="checkbox"
						id={item.name}
						checked={Object.prototype.hasOwnProperty.call($items, item.name) &&
							$items[item.name].done}
					/>
					<label class:done={item.done} for={item.name}>
						{item.name}
						{#if item.quantity > 1}
							{item.quantity} st
						{/if}
					</label>
					{#if item.comment}
						<p class="comment">{item.comment}</p>
					{/if}
				</p>
			{/each}
		{/if}
	{/each}

	{#if $itemsArray.filter((x) => !x.active).length < 1}
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
	.comment {
		font-size: 10px;
		color: #666;
		text-indent: 2em;
		user-select: none;
	}
</style>
