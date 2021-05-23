<script lang="ts">
	import Button from '$lib/button.svelte';
	import { items } from '../../stores/items';
	import { _ } from 'svelte-i18n';

	const restore = (e) => {
		e.preventDefault();

		const form = e.target;
		const file = form.file;

		if (file.files.length < 1) {
			return alert($_('settings.upload.warning_no_file_chosen'));
		}

		const reader = new FileReader();

		reader.readAsText(file.files[0], 'utf-8');

		reader.onload = (e) => {
			const content = e.target.result.toString();

			if (!content) {
				return alert($_('settings.upload.warning_no_content'));
			}

			const json = JSON.parse(content);

			items.set(json);

			alert($_('settings.upload.done'));
		};
	};
</script>

<h3>{$_('settings.upload.title')}</h3>

<p>
	{$_('settings.upload.description')}
	<strong>{$_('settings.upload.warning')}</strong>
</p>

<form on:submit={restore} enctype="multipart/form-data" method="post">
	<input name="file" id="file" type="file" accept=".json" />

	<div class="upload-button">
		<Button type="submit">
			{$_('settings.upload.cta')}
		</Button>
	</div>
</form>

<style>
	.upload-button {
		padding-top: 12px;
	}
</style>
