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

	//const popup = new mapbox.Popup({ offset: 25 }).setText(label);

	const marker = new ClickableMarker().setLngLat([lon, lat]).onClick(onClick).addTo(map);

	console.log('new marker');

	onDestroy(() => {
		console.log('removed');
		marker.remove();
	});
</script>
