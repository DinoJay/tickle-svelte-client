<script>
	import '../app.css';
	import Notifications from 'svelte-notifications';
	import Nav from '$lib/components/Nav.svelte';
	import Authenticated from '$lib/components/auth/Authenticated.svelte';
	import { onMount } from 'svelte';
	import { auth } from '$lib/firebaseConfig/firebase';
	import { onAuthStateChanged } from 'firebase/auth';
	import { get } from 'svelte/store';
	import { store } from '/src/store';
	import CardView from './CardView.svelte';

	onMount(() => {
		onAuthStateChanged(auth, (currentUser) => {
			if (currentUser) {
				store.update((obj) => ({ ...obj, currentUser }));
			} else {
				store.update((obj) => ({ ...obj, currentUser: null }));
			}
		});
	});
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
