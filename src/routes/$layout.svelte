<script context="module">
	import { waitLocale } from 'svelte-i18n';
	import '../i18n';

	export async function preload() {
		// awaits for the loading of the 'en-US' and 'en' dictionaries
		return waitLocale();
	}
</script>

<script>
	import Header from '$lib/header.svelte';
	import '../app.css';
	import { _ } from 'svelte-i18n';
</script>

<Header />

<main>
	<slot />
</main>

<footer>
	<p>
		{$_('footer.copyright')} <a href="https://www.satsuma.se">Satsuma Studios</a>
	</p>
</footer>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	}
</style>
