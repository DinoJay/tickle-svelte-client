<script>
	import '../app.css';
	import Notifications from '$lib/components/Notifications/index.svelte';
	import NavigationBar from '$lib/components/navigationBar/NavigationBar.svelte';
	import ListenAuth from '$lib/components/auth/utils/ListenAuth.svelte';
</script>

<ListenAuth>
	<Notifications>
		<NavigationBar />
		<slot />
		<div class="" id="modals" />
		<div id="notifications" />
	</Notifications>
</ListenAuth>

<style>
</style>
