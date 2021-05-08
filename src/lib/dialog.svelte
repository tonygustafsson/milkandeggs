<script lang="typescript">
	import { onMount } from 'svelte';
	import Button from '$lib/button.svelte';
	import IconDone from '$lib/icons/done.svelte';

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

	<slot />

	<div class="close-button">
		<Button size="small" border={false} on:click={onClose}>
			<IconDone />
		</Button>
	</div>
</dialog>

<style>
	dialog {
		position: fixed;
		top: 50vh;
		background-color: #fff;
		border: none;
		padding: 0 2rem 2rem 2rem;
		box-shadow: 0 0 40px rgba(0, 0, 0, 0.1), 0 0 10px rgba(0, 0, 0, 0.25);
		max-width: 90vw;
		box-sizing: border-box;
		text-align: left;
	}

	dialog[open] {
		animation: appear 0.15s cubic-bezier(0, 1.8, 1, 1.8);
	}

	.modal-title {
		background-color: #eee;
	}

	.modal-title h4 {
		margin: 0.5em 0 1em 0;
	}

	.close-button {
		position: absolute;
		top: 6px;
		right: 6px;
	}
</style>
