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

<tr>
	<td>
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
	</td>

	{#if item.comment}
		<td>
			<p class="comment">{item.comment}</p>
		</td>
	{:else}
		<td />
	{/if}
</tr>

<style>
	tr {
		margin-bottom: 0.5em;
	}
	tr:nth-child(2n + 1) {
		background-color: #fafafa;
	}
	td {
		height: 34px;
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
		user-select: none;
	}

	@media (max-width: 600px) {
		label {
			max-width: 7em;
			word-break: break-all;
		}
	}
</style>
