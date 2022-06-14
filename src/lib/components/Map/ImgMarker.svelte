<script>
	import { getContext } from 'svelte';
	import { mapbox, key } from './mapbox.js';

	const { getMap } = getContext(key);
	const map = getMap();

	export let lat;
	export let lon;
	export let label;
	export let onClick;

    $: {x, y} = map.project([lon, lat]);
</script>

<div class="absolute text-2xl" style="left:{x}px;top:{y}px">X</div>
