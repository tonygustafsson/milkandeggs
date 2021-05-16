<script lang="ts">
	export let id;
	export let value = '';
	export let placeholder = '';
	export let type = 'text';
	export let name = '';
</script>

<input {id} {type} {name} {placeholder} {value} on:change {...$$restProps} />

<style>
	input {
		padding: 0.25em 0.5em;
		background-color: #fff;
		font-size: 1rem;
		border: 1px #999 solid;
	}

	input[disabled] {
		background-color: #eee;
		cursor: not-allowed;
	}
</style>
