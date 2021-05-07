<script lang="typescript">
	import Button from '$lib/button.svelte';
	import { items, itemsArray } from '../../stores/items';
	import type Item from '../../types/item';
	import Textfield from '$lib/textfield.svelte';
	import Checkbox from '$lib/checkbox.svelte';
	import Dialog from '$lib/dialog.svelte';

	export let item: Item;

	$: commentDialogOpen = false;

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

	const openCommentDialog = () => {
		commentDialogOpen = true;
	};

	const comment = (e: any) => {
		const id = e.target.getAttribute('data-item-id');
		const item = $itemsArray.find((x) => x.name === id);

		item.comment = e.target.value;
		items.set($items);
	};
</script>

<div>
	<Checkbox
		on:change={toggleActivation}
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

	<Button disabled={!item.active} on:click={openCommentDialog}>Kommentar</Button>

	{#if commentDialogOpen}
		<Dialog
			open={commentDialogOpen}
			onClose={() => (commentDialogOpen = false)}
			title={`Kommentera ${item.name}`}
		>
			<Textfield
				disabled={!item.active}
				data-item-id={item.name}
				value={item.comment || ''}
				type="text"
				placeholder="Kommentar"
				on:change={comment}
			/>
		</Dialog>
	{/if}
</div>

<style>
	label {
		user-select: none;
	}
</style>
