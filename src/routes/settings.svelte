<script lang="typescript">
	import { settings } from '../stores/settings';
	import Button from '$lib/button.svelte';
	import TextField from '$lib/textfield.svelte';
	import IconRemove from '$lib/icons/remove.svelte';
	import { _, locale } from 'svelte-i18n';

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

	const setLanguage = (language: string) => {
		if (language !== 'se' && language !== 'en') {
			return;
		}

		settings.set({ ...$settings, language: language });
	};
</script>

<svelte:head>
	<title>{$_('settings.title')}</title>
</svelte:head>

<div class="content">
	<h3>{$_('settings.list.title')}</h3>

	{#if $settings.listId}
		<p>List ID: {$settings.listId}</p>

		<Button on:click={forgetList}>
			<IconRemove />
			{$_('settings.list.forget_list')}
		</Button>
	{:else}
		<p>{$_('settings.list.no_list')}</p>

		<Button on:click={createList}>{$_('settings.list.create_new_list')}</Button>

		<p>{$_('settings.list.or')}</p>

		<form on:submit={attachList}>
			<TextField placeholder="1fc229933f" name="listid" id="listid" />
			<Button type="submit">{$_('settings.list.connect')}</Button>
		</form>
	{/if}

	<h3>{$_('settings.language.title')}</h3>

	<p>
		{$_('settings.language.current_language')} <u>{$locale === 'en' ? 'English' : 'Swedish'}</u>.
	</p>

	{#if $locale === 'en'}
		<a href="/settings" on:click={() => setLanguage('se')}>Switch to Swedish</a>
	{:else}
		<a href="/settings" on:click={() => setLanguage('en')}>Switch to English</a>
	{/if}
</div>

<style>
</style>
