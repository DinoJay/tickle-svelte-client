<script>
	import '../app.css';
	import Notifications from '$lib/components/Notifications/index.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import ListenAuth from '$lib/components/auth/utils/ListenAuth.svelte';
</script>

<ListenAuth>
	<Notifications>
		<Nav />
		<slot />
		<div class="" id="modals" />
		<div id="notifications" />
	</Notifications>
</ListenAuth>

<style>
</style>
