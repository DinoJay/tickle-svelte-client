<script>
	import '../app.css';
	import Notifications from '$lib/components/Notifications/index.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import ListenAuth from '$lib/components/auth/utils/ListenAuth.svelte';
</script>

<ListenAuth>
	<Notifications>
		<div
			class="mx-auto 2xl:my-6 xl:my-4 shadow-md border border-gray-200 p-3 grow flex flex-col layout-container overflow-hidden"
		>
			<Nav />
			<slot />
		</div>

		<div class="" id="modals" />
		<div id="notifications" />
	</Notifications>
</ListenAuth>

<style>
</style>
