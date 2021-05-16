<script lang="ts">
	export let disabled = false;
	export let size: 'large' | 'medium' | 'small' = 'medium';
	export let border = true;
</script>

<button
	class="button"
	class:noborder={!border}
	class:small={size === 'small'}
	{disabled}
	on:click
	{...$$restProps}
>
	<slot />
</button>

<style>
	.button {
		background-color: #fff;
		border: 1px #999 solid;
		font-size: 1rem;
		padding: 0.35em 0.5em;
		cursor: pointer;
	}

	:global(.button > svg) {
		vertical-align: bottom !important;
		margin-right: 0.2em;
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
