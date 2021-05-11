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
	import IconRemove from '$lib/icons/remove.svelte';
	import IconSave from '$lib/icons/save.svelte';
	import IconDone from '$lib/icons/done.svelte';
	import IconClose from '$lib/icons/close.svelte';

	export let item: Item;

	$: commentDialogOpen = false;
	$: removeDialogOpen = false;

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

	const saveComment = (e: any) => {
		e.preventDefault();

		const form = e.target;
		const currentItem = $items[item.id];

		currentItem.comment = form.comment.value;
		items.set($items);

		commentDialogOpen = false;
	};

	const openRemoveDialog = () => {
		removeDialogOpen = true;
	};

	const deleteItem = (itemId: string, e: any) => {
		e.preventDefault();

		delete $items[itemId];
		items.set($items);

		removeDialogOpen = false;
	};
</script>

<div class="root">
	<div class="left">
		<Checkbox
			on:change={toggleActivation}
			name={item.name}
			id={item.id}
			checked={$items[item.id].active}
		/>

		<label for={item.id}>
			{item.name}
		</label>
	</div>

	<div class="right">
		<div class="action-bar" class:action-bar-disabled={!$items[item.id].active}>
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
				<IconComment active={!!item.comment} />
			</Button>
		</div>

		<Button size="small" border={false} on:click={openRemoveDialog}>
			<IconRemove />
		</Button>
	</div>

	{#if commentDialogOpen}
		<Dialog
			open={commentDialogOpen}
			onClose={() => (commentDialogOpen = false)}
			title={`Kommentera ${item.name}`}
		>
			<form on:submit={saveComment}>
				<Textfield
					disabled={!item.active}
					name="comment"
					value={item.comment || ''}
					type="text"
					placeholder="Kommentar"
				/>

				<Button type="submit">
					<IconSave />
					Spara
				</Button>
			</form>
		</Dialog>
	{/if}

	{#if removeDialogOpen}
		<Dialog
			open={removeDialogOpen}
			onClose={() => (removeDialogOpen = false)}
			title={`Vill du radera ${item.name}?`}
		>
			<form on:submit={(e) => deleteItem(item.id, e)}>
				<Button type="submit">
					<IconDone />
					Ja
				</Button>

				<Button on:click={() => (removeDialogOpen = false)}>
					<IconRemove />
					Nej
				</Button>
			</form>
		</Dialog>
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
	.left {
		flex: 1.8 0 0;
	}
	.right {
		flex: 1 0 0;
		text-align: right;
	}
	label {
		min-width: 13em;
		user-select: none;
	}
	.action-bar {
		display: inline-block;
	}
	.action-bar-disabled {
		opacity: 0.3;
		pointer-events: none;
		user-select: none;
	}

	@media (min-width: 600px) {
		.left {
			flex: 2 0 0;
		}
	}
</style>
