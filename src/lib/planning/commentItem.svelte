<script lang="ts">
	import Button from '$lib/button.svelte';
	import { items } from '../../stores/items';
	import type Item from '../../types/item';
	import Dialog from '$lib/dialog.svelte';
	import IconComment from '$lib/icons/comment.svelte';
	import IconSave from '$lib/icons/save.svelte';
	import Textfield from '$lib/textfield.svelte';
	import { _ } from 'svelte-i18n';

	export let item: Item;
	let formEl;

	$: commentDialogOpen = false;

	const openCommentDialog = () => {
		commentDialogOpen = true;

		setTimeout(() => {
			formEl.comment.focus();
		}, 0);
	};

	const saveComment = (e: any) => {
		e.preventDefault();

		const form = e.target;
		const currentItem = $items[item.id];

		currentItem.comment = form.comment.value;
		items.set($items);

		commentDialogOpen = false;
	};
</script>

<Button size="small" border={false} on:click={openCommentDialog}>
	<IconComment active={!!item.comment} />
</Button>

{#if commentDialogOpen}
	<Dialog
		onClose={() => (commentDialogOpen = false)}
		title={`${$_('planning.comment')} ${item.name}`}
	>
		<form bind:this={formEl} on:submit={saveComment}>
			<Textfield
				disabled={!item.active}
				name="comment"
				id="comment-{item.id}"
				value={item.comment || ''}
				type="text"
				placeholder={$_('planning.comment_placeholder')}
			/>

			<Button type="submit">
				<IconSave />
				{$_('common.save')}
			</Button>
		</form>
	</Dialog>
{/if}
