<script lang="typescript">
	export let id: string;
	export let value: string = '';
	export let placeholder: string = '';
	export let type: string = 'text';
	export let name: string;
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
