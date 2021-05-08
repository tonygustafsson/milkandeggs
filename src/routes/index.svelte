<script context="module">
	export const prerender = true;
</script>

<script lang="typescript">
	import { items, itemsArray } from '../stores/items';
	import { categoriesArray } from '../stores/categories';
	import Checkbox from '$lib/checkbox.svelte';
	import Button from '$lib/button.svelte';
	import IconDone from '$lib/icons/done.svelte';

	$: getMatchingCategoryItems = (categoryId: string) => {
		return $itemsArray.filter((x) => x.categoryId == categoryId && x.active);
	};
	$: categoryHasItems = (categoryId: string) =>
		$itemsArray.find((x) => x.categoryId == categoryId && x.active);

	const checkItem = (e) => {
		if ($items[e.target.id]) {
			$items[e.target.id].done = e.target.checked;
		}
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
	<div class="button-panel">
		<Button on:click={clear}>
			<IconDone />
			Allt klart
		</Button>
	</div>

	{#each $categoriesArray as category}
		{#if categoryHasItems(category.id)}
			<h3>{category.name}</h3>

			{#each getMatchingCategoryItems(category.id) as item}
				<p>
					<Checkbox
						on:change={checkItem}
						name={item.name}
						id={item.id}
						hidden
						checked={Object.prototype.hasOwnProperty.call($items, item.id) && $items[item.id].done}
					/>
					<label class:done={item.done} for={item.id}>
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
