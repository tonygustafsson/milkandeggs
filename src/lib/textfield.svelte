<script lang="typescript">
	export let value: string = '';
	export let placeholder: string = '';
	export let type: string = 'text';
	export let name: string;
</script>

<input {type} {name} {placeholder} {value} {...$$restProps} />

<style>
	input {
		padding: 0.25em 0.5em;
		background-color: #fff;
		border: 1px #999 solid;
	}
</style>
