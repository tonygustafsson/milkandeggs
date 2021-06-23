<script lang="ts">
	import { onMount } from 'svelte';
	import Button from '$lib/button.svelte';
	import IconClose from '$lib/icons/close.svelte';

	export let title: string;
	export let onClose: VoidFunction;

	$: width = 0;
	$: positionStyle = '';

	let dialog;

	onMount(() => {
		const top = Math.floor(window.scrollY + window.innerHeight / 5);
		const size = dialog.getBoundingClientRect();
		width = size.width;

		positionStyle = `top: ${top}px; left: calc(50vw - ${width / 2}px);`;

		// Prevent body scrolling when active
		document.body.style.overflow = 'hidden';

		return () => {
			// Allow body scrolling once dialog is closed
			document.body.style.overflow = 'visible';
		};
	});
</script>

<div class="root" bind:this={dialog} style={positionStyle}>
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
</div>

<style>
	.root {
		position: absolute;
		display: block;
		top: 0;
		left: 0;
		background-color: #fff;
		box-shadow: 0 0 40px rgba(0, 0, 0, 0.1), 0 0 10px rgba(0, 0, 0, 0.25);
		max-width: 90vw;
		box-sizing: border-box;
		text-align: left;
		padding: 0;
		z-index: 10;
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
