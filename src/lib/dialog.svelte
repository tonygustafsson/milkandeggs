<script lang="ts">
	import { onMount } from 'svelte';
	import Button from '$lib/button.svelte';
	import IconClose from '$lib/icons/close.svelte';

	export let title: string;
	export let open: boolean;
	export let onClose: VoidFunction;

	$: width = 0;
	$: height = 0;
	$: positionStyle = '';

	let dialog;

	onMount(() => {
		const size = dialog.getBoundingClientRect();
		width = size.width;
		height = size.height;

		positionStyle = `top: calc(50vh - ${height}px);`;
	});
</script>

<dialog {open} bind:this={dialog} style={positionStyle}>
	<div class="modal-title">
		<h4>{title}</h4>
	</div>

	<div class="modal-body">
		<slot />
	</div>

	<div class="close-button">
		<Button size="medium" border={false} on:click={onClose}>
			<IconClose />
		</Button>
	</div>
</dialog>

<style>
	dialog {
		position: fixed;
		top: 50vh;
		background-color: #fff;
		border: none;
		box-shadow: 0 0 40px rgba(0, 0, 0, 0.1), 0 0 10px rgba(0, 0, 0, 0.25);
		max-width: 90vw;
		box-sizing: border-box;
		text-align: left;
		padding: 0;
		z-index: 10;
	}

	dialog[open] {
		animation: appear 0.15s cubic-bezier(0, 1.8, 1, 1.8);
	}

	.modal-body {
		padding: 0.5rem 1rem 1rem 1rem;
	}

	.modal-title {
		background-color: #eee;
	}

	.modal-title h4 {
		margin: 0.5em 3em 1em 1em;
	}

	.close-button {
		position: absolute;
		top: 5px;
		right: 6px;
	}
</style>
