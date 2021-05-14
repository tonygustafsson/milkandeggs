import { register, init } from 'svelte-i18n';
import { settings } from './stores/settings';
import { locale } from 'svelte-i18n';

register('en', () => import('./lang/en.json'));
register('se', () => import('./lang/se.json'));

init({
	fallbackLocale: 'en',
	initialLocale: 'en'
});

// Update the language when changing language in settings
settings.subscribe((value) => {
	locale.set(value.language);
});
