<script lang="typescript">
	import Button from '$lib/button.svelte';
	import { items } from '../../stores/items';
	import type Item from '../../types/item';
	import Dialog from '$lib/dialog.svelte';
	import IconRemove from '$lib/icons/remove.svelte';
	import IconDone from '$lib/icons/done.svelte';
	import { _ } from 'svelte-i18n';

	export let item: Item;

	$: removeDialogOpen = false;

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

<Button size="small" border={false} on:click={() => (removeDialogOpen = true)}>
	<IconRemove />
</Button>

<Dialog
	open={removeDialogOpen}
	onClose={() => (removeDialogOpen = false)}
	title={`${$_('planning.do_you_want_to_remove')} ${item.name}?`}
>
	<form on:submit={(e) => deleteItem(item.id, e)}>
		<Button type="submit">
			<IconDone />
			{$_('common.yes')}
		</Button>

		<Button on:click={(e) => (e.preventDefault(), (removeDialogOpen = false))}>
			<IconRemove />
			{$_('common.no')}
		</Button>
	</form>
</Dialog>
