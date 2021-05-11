<script lang="typescript">
	import Button from '$lib/button.svelte';
	import { items, itemsArray } from '../../stores/items';
	import type Item from '../../types/item';
	import Checkbox from '$lib/checkbox.svelte';
	import IconPlus from '$lib/icons/plus.svelte';
	import IconMinus from '$lib/icons/minus.svelte';
	import RemoveItem from '$lib/planning/removeItem.svelte';
	import CommentItem from '$lib/planning/commentItem.svelte';

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

			<CommentItem {item} />
		</div>

		<RemoveItem {item} />
	</div>
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
