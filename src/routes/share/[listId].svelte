<script lang="ts">
	import { page } from '$app/stores';
	import { settings } from '../../stores/settings';
	import Button from '$lib/button.svelte';
	import { goto } from '$app/navigation';
	import { _ } from 'svelte-i18n';

	const listId = $page.params.listId;

	const accept = (e) => {
		e.preventDefault();

		if (listId.length < 5) {
			return goto('/');
		}

		settings.set({ ...$settings, listId: listId });
		goto('/');
	};

	const deny = () => {
		goto('/');
	};

	const denyAndGoToSettings = () => {
		goto('/settings');
	};
</script>

<h3>{$_('share.title')}</h3>

<p>{$_('share.information')} (List ID: <strong>{listId}</strong>)</p>

{#if $settings.listId && listId}
	<p>
		<strong>{$_('share.warning_title')}</strong><br />
		{$_('share.warning_message')}
	</p>

	<form on:submit={accept}>
		<Button type="submit">{$_('common.yes')}</Button>
		<Button type="button" on:click={deny}>{$_('share.deny_back')}</Button>
	</form>
{:else if listId}
	<form on:submit={accept}>
		<Button type="submit">{$_('common.yes')}</Button>
		<Button type="button" on:click={denyAndGoToSettings}>{$_('share.deny_settings')}</Button>
	</form>
{/if}
