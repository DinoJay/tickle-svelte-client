<script>
	import '../app.css';
	import Notifications from 'svelte-notifications';
	import Nav from '$lib/components/Nav.svelte';
</script>

<Notifications>
	<div class="flex">
		<div
			class="mx-auto 2xl:my-6 xl:my-4 shadow-md border border-gray-200 p-3 grow layout-container"
		>
			<Nav />
			<slot />
		</div>
	</div>

	<div class="" id="modals" />
</Notifications>

<style>
</style>
