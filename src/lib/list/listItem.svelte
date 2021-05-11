<script lang="typescript">
	import Checkbox from '$lib/checkbox.svelte';
	import type Item from '../../types/item';
	import { items } from '../../stores/items';

	export let item: Item;

	const checkItem = (e) => {
		if ($items[e.target.id]) {
			$items[e.target.id].done = e.target.checked;
		}
	};
</script>

<div class="root">
	<Checkbox
		on:change={checkItem}
		name={item.name}
		id={item.id}
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
</div>

<style>
	.root {
		display: flex;
		align-items: center;
		width: 100%;
		min-height: 24px;
		margin-bottom: 0.5em;
	}
	.done {
		text-decoration: line-through;
	}
	label {
		user-select: none;
	}
	.comment {
		font-size: 10px;
		color: #666;
		text-indent: 2em;
		user-select: none;
	}
</style>
