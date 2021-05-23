<script lang="ts">
	import Button from '$lib/button.svelte';
	import { _ } from 'svelte-i18n';
	import { items } from '../../stores/items';

	const backup = () => {
		const data = JSON.stringify($items);
		const blob = new Blob([data], { type: 'application/json' });
		const link = document.createElement('a');
		const url = URL.createObjectURL(blob);

		link.setAttribute('href', url);
		link.setAttribute('download', `milkandeggs-backup-${new Date().getTime()}.json`);
		link.click();
	};
</script>

<h3>{$_('settings.download.title')}</h3>

<p>
	{$_('settings.download.description')}
</p>

<Button on:click={backup}>{$_('settings.download.cta')}</Button>
