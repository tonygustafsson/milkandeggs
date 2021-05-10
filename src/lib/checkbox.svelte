<script lang="typescript">
	export let id: string = '';
	export let name: string = '';
	export let value: string = '';
	export let checked: boolean = false;
	export let hidden: boolean = false;

	import IconCheckboxEmpty from '$lib/icons/checkbox-empty.svelte';
	import IconCheckboxChecked from '$lib/icons/checkbox-checked.svelte';
</script>

<input type="checkbox" {id} {name} {checked} {value} on:change {...$$restProps} />

{#if !hidden && checked}
	<label for={id} class="icon">
		<IconCheckboxChecked on:click={() => (checked = !checked)} />
	</label>
{/if}

{#if !hidden && !checked}
	<label for={id} class="icon">
		<IconCheckboxEmpty on:click={() => (checked = !checked)} />
	</label>
{/if}

<style>
	input[type='checkbox'] {
		display: none;
	}

	.icon {
		margin-right: 0.75em;
	}
</style>
