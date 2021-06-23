<script lang="ts">
	import categories from '../../data/categories.json';
	import { items } from '../../stores/items';
	import Textfield from '$lib/textfield.svelte';
	import Button from '$lib/button.svelte';
	import Dropdown from '$lib/dropdown.svelte';
	import IconSave from '$lib/icons/save.svelte';
	import IconPlus from '$lib/icons/plus.svelte';
	import Dialog from '$lib/dialog.svelte';
	import { _ } from 'svelte-i18n';
	import Checkbox from '$lib/checkbox.svelte';

	$: addItemDialogOpen = false;
	$: addItemAsActive = true;

	let formEl;

	const createItemIdFromName = (name: string) => {
		let id = name.trim().replace(/ /g, '-');
		id = id.replace(/å/g, 'a');
		id = id.replace(/Å/g, 'a');
		id = id.replace(/ä/g, 'a');
		id = id.replace(/ä/g, 'a');
		id = id.replace(/ö/g, 'o');
		id = id.replace(/Ö/g, 'o');
		id = id.toLowerCase();
		id = id.replace(/[^0-9a-z-]/gi, '');

		return id;
	};

	const openAddItemDialog = () => {
		addItemDialogOpen = true;

		setTimeout(() => {
			formEl.name.focus();
		}, 0);
	};

	const addItem = (e) => {
		e.preventDefault();

		const form = e.target;
		const newItemId = createItemIdFromName(form.name.value);

		if (!newItemId) {
			return;
		}

		if (!$items) {
			$items = {};
		}

		$items[newItemId] = {
			id: newItemId,
			name: form.name.value.trim(),
			categoryId: form.category.value,
			active: addItemAsActive,
			done: false,
			quantity: 1,
			comment: ''
		};

		items.set($items);

		addItemDialogOpen = false;
		form.name.value = '';
	};
</script>

<Button on:click={openAddItemDialog}>
	<IconPlus />
	{$_('planning.add_item')}
</Button>

{#if addItemDialogOpen}
	<Dialog onClose={() => (addItemDialogOpen = false)} title={$_('planning.add_item')}>
		<form bind:this={formEl} on:submit={addItem}>
			<Textfield type="text" id="name" name="name" />

			<Dropdown name="category">
				{#each categories as category}
					<option value={category}>{$_(`categories.${category}`)}</option>
				{/each}
			</Dropdown>

			<Button type="submit">
				<IconSave />
				{$_('common.save')}
			</Button>

			<div class="add-as-active">
				<Checkbox
					name="add-as-active"
					id="add-as-active"
					checked={addItemAsActive}
					on:change={() => (addItemAsActive = !addItemAsActive)}
				/>

				<label for="add-as-active">{$_('planning.add_item_as_active')}</label>
			</div>
		</form>
	</Dialog>
{/if}

<style>
	.add-as-active {
		padding-top: 12px;
	}
</style>
