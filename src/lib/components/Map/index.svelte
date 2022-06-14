<script>
	import { onDestroy, setContext } from 'svelte';
	import { mapbox, key } from './mapbox.js';
	import { store } from '/src/store.js';
	import avatars from '$lib/styles/avatars/index';

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
		map = new mapbox.Map({
			container,
			style: 'mapbox://styles/mapbox/streets-v9',
			center: [lon, lat],
			zoom
		});

		loaded = true;
	}

	$: if ($store.currentUser.location) {
		if (loaded) {
			let userLongitude = $store.currentUser.location.longitude;
			let userLatitude = $store.currentUser.location.latitude;

			map.setCenter({
				lng: userLongitude,
				lat: userLatitude
			});
		}
	}

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
