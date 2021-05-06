<script lang="typescript">
	import Button from '$lib/button.svelte';
	import { items, itemsArray } from '../../stores/items';
	import type Item from '../../types/item';

	export let item: Item;

	const toggleActivation = (e: any) => {
		const active = e.target.checked;
		const id = e.target.id;
		const item = $itemsArray.find((x) => x.id === id);

		item.active = active;
		item.done = !active;
		item.quantity = 1;

		if (!active) {
			item.comment = '';
		}

		items.set($items);
	};

	const increaseQuantity = (e: any) => {
		const id = e.target.getAttribute('data-item-id');
		const item = $itemsArray.find((x) => x.name === id);

		item.quantity++;
		items.set($items);
	};

	const decreaseQuantity = (e: any) => {
		const id = e.target.getAttribute('data-item-id');
		const item = $itemsArray.find((x) => x.name === id);

		if (item.quantity < 2) {
			return;
		}

		item.quantity--;
		items.set($items);
	};

	const comment = (e: any) => {
		const id = e.target.getAttribute('data-item-id');
		const item = $itemsArray.find((x) => x.name === id);

		item.comment = e.target.value;
		items.set($items);
	};
</script>

<div>
	<input
		on:change={toggleActivation}
		type="checkbox"
		name={item.name}
		id={item.id}
		checked={Object.prototype.hasOwnProperty.call($items, item.id) && $items[item.id].active}
	/>
	<label for={item.id}>
		{item.name}
	</label>

	<Button size="small" disabled={!item.active} data-item-id={item.name} on:click={increaseQuantity}
		>+</Button
	>
	<span>{item.quantity}</span>
	<Button size="small" disabled={!item.active} data-item-id={item.name} on:click={decreaseQuantity}
		>-</Button
	>
	<input
		disabled={!item.active}
		data-item-id={item.name}
		value={item.comment || ''}
		type="text"
		placeholder="Kommentar"
		on:change={comment}
	/>
</div>

<style>
	label {
		user-select: none;
	}
</style>
