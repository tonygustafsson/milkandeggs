<script lang="typescript">
	import Button from '$lib/button.svelte';
	import { items } from '../../stores/items';
	import type Item from '../../types/item';
	import Dialog from '$lib/dialog.svelte';
	import IconComment from '$lib/icons/comment.svelte';
	import IconSave from '$lib/icons/save.svelte';
	import Textfield from '$lib/textfield.svelte';

	export let item: Item;

	$: commentDialogOpen = false;

	const saveComment = (e: any) => {
		e.preventDefault();

		const form = e.target;
		const currentItem = $items[item.id];

		currentItem.comment = form.comment.value;
		items.set($items);

		commentDialogOpen = false;
	};
</script>

<Button size="small" border={false} on:click={() => (commentDialogOpen = true)}>
	<IconComment active={!!item.comment} />
</Button>

{#if commentDialogOpen}
	<Dialog open={true} onClose={() => (commentDialogOpen = false)} title={`Kommentera ${item.name}`}>
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
