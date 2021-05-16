<script lang="ts">
	export let id = '';
	export let name = '';
	export let value = '';
	export let checked = false;

	import IconCheckboxEmpty from '$lib/icons/checkbox-empty.svelte';
	import IconCheckboxChecked from '$lib/icons/checkbox-checked.svelte';
</script>

<input type="checkbox" {id} {name} {checked} {value} on:change {...$$restProps} />

{#if checked}
	<label for={id} class="icon">
		<IconCheckboxChecked on:click={() => (checked = !checked)} />
	</label>
{/if}

{#if !checked}
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
