<script>
	import { afterUpdate, onDestroy, setContext } from 'svelte';
	import { mapbox, key } from './mapbox.js';
	import { store } from '/src/stores/index';

	setContext(key, {
		getMap: () => map
	});

	export let lat;
	export let lon;
	export let zoom;

	let container;
	let map;
	let loaded = false;

	function load() {
		const center = lon && lat ? { center: [lon, lat] } : {};
		map = new mapbox.Map({
			container,
			style: 'mapbox://styles/mapbox/streets-v9',
			...center,
			zoom
		});

		loaded = true;
	}

	// $: if ($store.currentUser.location) {
	// 	if (loaded) {
	// 		const { lon: lng, lat } = $store.currentUser.location;

	// 		map.setCenter({
	// 			lng,
	// 			lat
	// 		});
	// 	}
	// }

	afterUpdate(() => {
		if (lon && lat)
			map.setCenter({
				lng: lon,
				lat
			});
	});

	onDestroy(() => {
		if (map) map.remove();
	});
</script>

<!-- this special element will be explained in a later section -->
<svelte:head>
	<link rel="stylesheet" href="https://unpkg.com/mapbox-gl/dist/mapbox-gl.css" on:load={load} />
</svelte:head>

<div bind:this={container}>
	{#if map}
		<slot />
	{/if}
</div>

<style>
	div {
		@apply relative;
		width: 100%;
		height: 100%;
	}
</style>
