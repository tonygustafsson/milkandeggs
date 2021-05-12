<script context="module">
	import { browser, dev } from '$app/env';

	// we don't need any JS on this page, though we'll load
	// it in dev so that we get hot module replacement...
	export const hydrate = dev;

	// ...but if the client-side router is already loaded
	// (i.e. we came here from elsewhere in the app), use it
	export const router = browser;

	// since there's no dynamic data here, we can prerender
	// it so that it gets served as a static asset in prod
	export const prerender = true;
</script>

<script lang="typescript">
	import { settings } from '../stores/settings';
	import Button from '$lib/button.svelte';
	import TextField from '$lib/textfield.svelte';
	import IconRemove from '$lib/icons/remove.svelte';

	const generateGuid = () =>
		Math.floor((1 + Math.random()) * 0x10000000000)
			.toString(16)
			.substring(1);

	const createList = () => {
		const listId = generateGuid();
		settings.set({ ...$settings, listId: listId });
	};

	const forgetList = () => {
		settings.set({ ...$settings, listId: null });
	};

	const attachList = (e) => {
		e.preventDefault();

		const form = e.target;
		const listId = form.listid.value;
		settings.set({ ...$settings, listId: listId });
	};
</script>

<svelte:head>
	<title>Inställningar</title>
</svelte:head>

<div class="content">
	<h3>Lista</h3>

	{#if $settings.listId}
		<p>List ID: {$settings.listId}</p>

		<Button on:click={forgetList}>
			<IconRemove />
			Glöm lista
		</Button>
	{:else}
		<p>Du har ingen aktiv lista kopplad. Skapa en ny eller koppla en existerande lista.</p>

		<Button on:click={createList}>Skapa ny lista</Button>

		<p>Eller...</p>

		<form on:submit={attachList}>
			<TextField placeholder="1fc229933f" name="listid" id="listid" />
			<Button type="submit">Koppla</Button>
		</form>
	{/if}
</div>

<style>
</style>
