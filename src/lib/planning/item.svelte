<script lang="typescript">
	import Button from '$lib/button.svelte';
	import { items, itemsArray } from '../../stores/items';
	import type Item from '../../types/item';
	import Textfield from '$lib/textfield.svelte';
	import Checkbox from '$lib/checkbox.svelte';
	import Dialog from '$lib/dialog.svelte';
	import IconPlus from '$lib/icons/plus.svelte';
	import IconMinus from '$lib/icons/minus.svelte';
	import IconComment from '$lib/icons/comment.svelte';

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

	const increaseQuantity = (id: string) => {
		const item = $items[id];

		item.quantity++;
		items.set($items);
	};

	const decreaseQuantity = (id: string) => {
		const item = $items[id];

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

<div class="root">
	<Checkbox
		on:change={toggleActivation}
		name={item.name}
		id={item.id}
		checked={Object.prototype.hasOwnProperty.call($items, item.id) && $items[item.id].active}
	/>

	<label for={item.id}>
		{item.name}
	</label>

	<Button
		border={false}
		size="small"
		disabled={!item.active}
		on:click={() => decreaseQuantity(item.id)}
	>
		<IconMinus />
	</Button>

	<span>{item.quantity}</span>

	<Button
		border={false}
		size="small"
		disabled={!item.active}
		data-item-id={item.id}
		on:click={() => increaseQuantity(item.id)}
	>
		<IconPlus />
	</Button>

	<Button border={false} size="small" disabled={!item.active} on:click={openCommentDialog}>
		<IconComment />
	</Button>

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
	.root {
		display: flex;
		align-items: center;
		width: 100%;
		margin-bottom: 0.5em;
	}
	label {
		min-width: 13em;
		user-select: none;
	}
</style>
