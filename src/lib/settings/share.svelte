<script lang="ts">
	import { settings } from '../../stores/settings';
	import Button from '$lib/button.svelte';
	import { _ } from 'svelte-i18n';
	import { dev } from '$app/env';

	const baseUrl = dev ? `http://localhost:3001/` : `https://www.milkandeggs.app/`;

	const share = () => {
		if (!navigator.share) {
			return alert('Not supported in your browser, please just send the link instead.');
		}

		navigator.share({
			text: `${$_('settings.share.send_message')} ${baseUrl}share/${$settings.listId}/`
		});
	};
</script>

<h3>{$_('settings.share.title')}</h3>

<p>
	{$_('settings.share.information')}<br />

	<a href="{baseUrl}share/{$settings.listId}">
		{baseUrl}share/{$settings.listId}/
	</a>
</p>

{#if navigator.share}
	<Button on:click={share}>
		{$_('settings.share.cta')}
	</Button>
{/if}
