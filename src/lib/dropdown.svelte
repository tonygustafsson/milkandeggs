<script lang="typescript">
	export let id = '';
	export let name = '';
</script>

<select {id} {name}>
	<slot />
</select>

<style>
	select {
		background-color: #fff;
		border: 1px #999 solid;
		padding: 0.25em 0.5em;
		font-size: 1rem;
	}
</style>
