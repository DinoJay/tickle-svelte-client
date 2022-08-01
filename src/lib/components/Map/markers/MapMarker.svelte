<script>
	import { getContext, onDestroy } from 'svelte';
	import { key } from '../mapbox.js';
	import { ClickableMarker } from './ClickableMarker.js';

	const { getMap } = getContext(key);
	const map = getMap();

	export let lon;
	export let lat;
	export let label;
	export let onClick;

	const marker = new ClickableMarker().setLngLat([lon, lat]).onClick(onClick).addTo(map);

	onDestroy(() => {
		marker.remove();
	});
</script>
