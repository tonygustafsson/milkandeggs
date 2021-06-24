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
