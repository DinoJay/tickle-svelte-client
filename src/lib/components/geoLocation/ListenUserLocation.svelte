<script>
	import { onMount } from 'svelte';
	import { store } from '/src/stores/index';
	import produce from 'immer';

	var watchId = null;

	onMount(() => {
		if (!watchId) {
			/**
			 * Check if the user's browser geolocation is allowed
			 */
			const geoLocPermission = () => {
				navigator.permissions.query({ name: 'geolocation' }).then((result) => {
					geoLocPosition(result.state);
					result.onchange = (event) => {
						geoLocPosition(event?.target?.state);
					};
				});
			};

			/**
			 * Add a watch position geolocation if the geolocation is allowed on user's browser
			 * @param state - granted or not
			 */
			const geoLocPosition = (state) => {
				if (state == 'granted' || state == 'prompt') {
					watchId = navigator.geolocation.watchPosition(success);
				} else {
					updateUserLocation(undefined);
					navigator.geolocation.clearWatch(watchId);
				}
			};

			/**
			 * Success function of the watch position geolocation
			 * @param position
			 */
			const success = (position) => {
				updateUserLocation({
					lon: position.coords.longitude,
					lat: position.coords.latitude
				});
			};

			/**
			 * Update the store object with the user's location
			 * @param location - null or {lon, lat}
			 */
			const updateUserLocation = (location) => {
				store.update((obj) => {
					const nextState = produce(obj, (draft) => {
						if (draft?.currentUser) draft.currentUser['location'] = location;
					});
					return nextState;
				});
			};

			geoLocPermission();
		}
	});
</script>

<slot />
