<script>
	import { store } from '/src/stores/index';

	const watchID = navigator.geolocation.watchPosition((position) => {
		let currentUser = $store.currentUser;

		currentUser.location = {
			lon: position.coords.longitude,
			lat: position.coords.latitude
		};

		store.update((obj) => ({
			...obj,
			currentUser
		}));
	});
</script>

<slot />
