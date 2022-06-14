<script>
	import { getContext } from 'svelte';
	import { mapbox, key } from './mapbox.js';

	const { getMap } = getContext(key);
	const map = getMap();

	export let lat;
	export let lon;
	export let label;
	export let onClick;

	console.log('lat', lat, 'lon', lon);
	$: pos = lon && lat ? map.project([lon, lat]) : { x: 0, y: 0 };
	$: console.log('pos', pos);

	$: if (map.isMoving()) console.log('move');
</script>

<div class="absolute text-2xl" style="left:{pos.x}px;top:{pos.y}px">X</div>
