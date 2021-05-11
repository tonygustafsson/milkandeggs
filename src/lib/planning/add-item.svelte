<script lang="typescript">
	import { categoriesArray } from '../../stores/categories';
	import { items } from '../../stores/items';
	import Textfield from '$lib/textfield.svelte';
	import Button from '$lib/button.svelte';
	import Dropdown from '$lib/dropdown.svelte';
	import SaveIcon from '$lib/icons/save.svelte';

	export let onClose: VoidFunction;

	const createItemIdFromName = (name: string) => {
		let id = name.replace(/\ /g, '-');
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
			name: form.name.value,
			categoryId: form.category.value,
			active: false,
			done: false,
			quantity: 1,
			comment: ''
		};

		items.set($items);

		onClose();
	};
</script>

<div>
	<form on:submit={addItem}>
		<Textfield type="text" name="name" />

		<Dropdown name="category">
			{#each $categoriesArray as category}
				<option value={category.id}>{category.name}</option>
			{/each}
		</Dropdown>

		<Button type="submit">
			<SaveIcon />
			Spara
		</Button>
	</form>
</div>

<style>
</style>
