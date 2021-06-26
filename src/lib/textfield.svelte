<script lang="ts">
	export let id;
	export let value = '';
	export let placeholder = '';
	export let type = 'text';
	export let name = '';
	export let onKeyUp: (e: Event) => void = null;

	let timer;

	const debouncedOnKeyUp = (e) => {
		if (!onKeyUp) {
			return;
		}

		clearTimeout(timer);
		timer = setTimeout(() => {
			onKeyUp(e);
		}, 500);
	};
</script>

<input
	{id}
	{type}
	{name}
	{placeholder}
	{value}
	on:change
	on:keyup={debouncedOnKeyUp}
	{...$$restProps}
/>

<style>
	input {
		width: 100%;
		padding: 0.25em 0.5em;
		background-color: #fff;
		font-size: 1rem;
		border: 1px #999 solid;
		box-sizing: border-box;
		margin-bottom: 8px;
	}
	input[disabled] {
		background-color: #eee;
		cursor: not-allowed;
	}
</style>
