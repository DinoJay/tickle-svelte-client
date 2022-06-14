<script>
	import { store } from '/src/store';

	const watchID = navigator.geolocation.watchPosition((position) => {
		let currentUser = $store.currentUser;

		currentUser.location = {
			longitude: position.coords.longitude,
			latitude: position.coords.latitude
		};

		store.update((obj) => ({
			...obj,
			currentUser
		}));
	});
</script>

<slot />
