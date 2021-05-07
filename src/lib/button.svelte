<script lang="typescript">
	export let disabled: boolean;
	export let size: 'large' | 'medium' | 'small' = 'medium';
</script>

<button class="button" class:small={size === 'small'} {disabled} {...$$restProps} on:click>
	<slot />
</button>

<style>
	.button {
		background-color: #fff;
		border: 1px #999 solid;
		font-size: 1rem;
		padding: 0.25em 0.5em;
	}

	.small {
		font-size: 1rem;
		padding: 0.1em 0.2em;
		min-width: 20px;
		min-height: 20px;
	}
</style>
