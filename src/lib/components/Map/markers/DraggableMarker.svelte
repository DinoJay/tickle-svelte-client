<script>
	import { getContext, onDestroy } from 'svelte';
	import { key, mapbox } from '../mapbox.js';

	const { getMap } = getContext(key);
	const map = getMap();

	export let lon;
	export let lat;

	const marker = new mapbox.Marker({ draggable: true }).setLngLat([lon, lat]).addTo(map);

	// Update coords when we select a new card
	$: if (lon || lat) {
		marker.setLngLat([lon, lat]);
	}

	marker.on('dragend', () => {
		let lngLat = marker.getLngLat();
		lon = lngLat.lng;
		lat = lngLat.lat;
	});

	onDestroy(() => {
		marker.remove();
	});
</script>
