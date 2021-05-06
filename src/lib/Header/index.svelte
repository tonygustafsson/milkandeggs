<script>
	import { page } from '$app/stores';
	import logo from './svelte-logo.svg';
</script>

<header>
	<div class="corner">
		<h1 class="heading">ShopDrop</h1>
	</div>

	<nav>
		<ul>
			<li class:active={$page.path === '/'}><a sveltekit:prefetch href="/">Listan</a></li>
			<li class:active={$page.path === '/planning'}>
				<a sveltekit:prefetch href="/planning">Planera</a>
			</li>
			<li class:active={$page.path === '/edit-items'}>
				<a sveltekit:prefetch href="/edit-items">Varor</a>
			</li>
		</ul>
	</nav>

	<div class="corner">
		<!-- TODO put something else here? github link? -->
	</div>
</header>

<style>
	header {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		background: #000;
	}

	@media (max-width: 600px) {
		header {
			flex: 1 0 0;
		}
	}

	.corner {
		width: 3em;
		height: 3em;
	}

	@media (max-width: 600px) {
		.corner {
			flex: 1 0 0;
			width: 100%;
		}
	}

	.heading {
		font-size: 2rem;
		margin: 12px;
		color: #fff;
	}

	@media (max-width: 600px) {
		.heading {
			font-size: 1.25rem;
		}
	}

	nav {
		display: flex;
		justify-content: center;
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li.active::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--accent-color);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 1em;
		color: #fff;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 10%;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--accent-color);
	}
</style>
