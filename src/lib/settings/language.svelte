<script lang="ts">
	import { settings } from '../../stores/settings';
	import { _, locale } from 'svelte-i18n';

	const setLanguage = (language: string) => {
		if (language !== 'se' && language !== 'en') {
			return;
		}

		settings.set({ ...$settings, language: language });
	};
</script>

<h3>{$_('settings.language.title')}</h3>

<p>
	{$_('settings.language.current_language')} <u>{$locale === 'en' ? 'English' : 'Swedish'}</u>.
</p>

{#if $locale === 'en'}
	<a href="/settings" on:click={() => setLanguage('se')}>Switch to Swedish</a>
{:else}
	<a href="/settings" on:click={() => setLanguage('en')}>Switch to English</a>
{/if}
