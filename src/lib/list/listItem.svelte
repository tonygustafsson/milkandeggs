<script lang="ts">
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
	<div>
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
	</div>

	{#if item.comment}
		<div>
			<p class="comment">{item.comment}</p>
		</div>
	{/if}
</div>

<style>
	.root {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		width: 100%;
		min-height: 24px;
		margin-bottom: 0.5em;
	}
	.root:nth-child(2n + 1) {
		background-color: #fafafa;
	}
	.root > div {
		flex: 1 0 100%;
		width: 100%;
	}
	.done {
		text-decoration: line-through;
	}
	label {
		display: inline-block;
		margin-top: 2px;
		user-select: none;
		vertical-align: text-top;
	}
	.comment {
		font-size: 12px;
		color: #666;
		text-indent: 3em;
		margin-top: 4px;
		margin-bottom: 0;
		user-select: none;
	}
</style>
