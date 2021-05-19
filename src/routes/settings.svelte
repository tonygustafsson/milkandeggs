<script lang="ts">
	import { settings } from '../stores/settings';
	import Button from '$lib/button.svelte';
	import TextField from '$lib/textfield.svelte';
	import IconRemove from '$lib/icons/remove.svelte';
	import { _, locale } from 'svelte-i18n';
	import { base as basePath } from '$app/paths';
	import { dev } from '$app/env';

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

	$: shareUrl = dev
		? `http://localhost:3001/share/${$settings.listId}/`
		: `https://www.milkandeggs.app/share/${$settings.listId}/`;

	const share = () => {
		if (!navigator.share) {
			return alert('Not supported in your browser, please just send the link instead.');
		}

		navigator.share({
			text: `${$_('settings.share.send_message')} ${shareUrl}`
		});
	};
</script>

<svelte:head>
	<title>{$_('settings.title')}</title>
	<base href={basePath} />
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

	{#if $settings.listId}
		<h3>{$_('settings.share.title')}</h3>

		<p>
			{$_('settings.share.information')}<br />

			<a href={shareUrl}>
				{shareUrl}
			</a>
		</p>

		{#if navigator.share}
			<Button on:click={share}>
				{$_('settings.share.cta')}
			</Button>
		{/if}
	{/if}
</div>

<style>
	.content {
		width: 600px;
		margin: 0 auto;
	}

	@media (max-width: 600px) {
		.content {
			width: auto;
		}
	}
</style>
