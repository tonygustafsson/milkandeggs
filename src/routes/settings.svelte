<script lang="ts">
	import { settings } from '../stores/settings';
	import { _ } from 'svelte-i18n';
	import { base as basePath } from '$app/paths';
	import Restore from '$lib/settings/restore.svelte';
	import Backup from '$lib/settings/backup.svelte';
	import Share from '$lib/settings/share.svelte';
	import Connect from '$lib/settings/connect.svelte';
	import Language from '$lib/settings/language.svelte';
</script>

<svelte:head>
	<title>{$_('settings.title')} - Milk &amp; Eggs</title>
	<base href={basePath} />
</svelte:head>

<div class="content">
	<Connect />
	<Language />

	{#if $settings.listId}
		<Share />
		<Backup />
		<Restore />
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
