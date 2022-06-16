<script>
	import { getContext } from 'svelte';
	import { mapbox, key } from './mapbox.js';
	import { ClickableMarker } from './ClickableMarker.js';

	const { getMap } = getContext(key);
	const map = getMap();

	export let lat;
	export let lon;
	export let label;
	export let onClick;

	const popup = new mapbox.Popup({ offset: 25 }).setText(label);

	const marker = new ClickableMarker().setLngLat([lon, lat]).onClick(onClick).addTo(map);
</script>
