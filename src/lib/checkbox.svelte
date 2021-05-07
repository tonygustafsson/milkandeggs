<script lang="typescript">
	export let id: string = '';
	export let name: string = '';
	export let value: string = '';
	export let checked: boolean;
	export let hidden: boolean = false;
</script>

<input type="checkbox" {id} {name} {checked} {value} class:hidden on:change {...$$restProps} />

<style>
	input {
		border: 1px #999 solid;
	}

	.hidden {
		display: none;
	}
</style>
