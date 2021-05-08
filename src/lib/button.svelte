<script lang="typescript">
	export let disabled: boolean = false;
	export let size: 'large' | 'medium' | 'small' = 'medium';
	export let border: boolean = true;
</script>

<button
	class="button"
	class:noborder={!border}
	class:small={size === 'small'}
	{disabled}
	{...$$restProps}
	on:click
>
	<slot />
</button>

<style>
	.button {
		background-color: #fff;
		border: 1px #999 solid;
		font-size: 1rem;
		padding: 0.25em 0.5em;
		cursor: pointer;
	}

	.noborder {
		border: 0;
	}

	.small {
		font-size: 1rem;
		padding: 0.1em 0.2em;
		min-width: 20px;
		min-height: 20px;
	}
</style>
