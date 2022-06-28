<script>
	import TopicMap from '$lib/TopicMap.svelte';
	import Slider from '$lib/Slider.svelte';
	import SelectEnvironment from '$lib/components/SelectEnvironment/index.svelte';
	import Authenticated from '$lib/components/auth/Authenticated.svelte';
	import Map from './Map.svelte';
	import MapIcon from 'svelte-material-icons/MapMarker.svelte';
	import WatchGeoLoc from '$lib/components/WatchGeoLoc.svelte';
	import { store } from '/src/stores/index';
	import { addNotification } from '/src/stores/notificationStore';

	export let envId;
	let selected = null;
	let map = false;
	let centerLoc = null;

	$: cards = $store.envs.find((env) => env.id === envId)?.cards;
	$: if (cards) centerLoc = cards.find((d) => d.id === selected)?.loc?.value;

	const checkGeoLocIsOn = () => {
		navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
			if (result.state != 'granted') {
				addNotification({
					text: 'Please, trun on your geolocation'
				});
			} else {
				map = !map;
			}
		});
	};
</script>

<Authenticated>
	<div class="flex flex-col relative h-[calc(100%-78px)] w-full">
		{#if cards?.length > 0}
			<div class="mb-2 z-10">
				<Slider {selected} {cards} onClick={(id) => (selected = id)} />
			</div>

			{#if !map}
				<TopicMap selectedId={selected} {cards} onClick={(id) => (selected = id)} />
			{:else}
				<WatchGeoLoc>
					<div class="absolute h-full w-full z-0">
						<Map
							center={[centerLoc?.latitude, centerLoc?.longitude]}
							data={cards}
							onClick={(id) => (selected = id)}
						/>
					</div>
				</WatchGeoLoc>
			{/if}

			<button
				on:click={() => checkGeoLocIsOn()}
				class="{map ? 'bg-teal-500' : 'bg-gray-300'} 
			absolute btn w-32 h-8 bottom-5 right-0 flex justify-center items-center border-2 border-black "
			>
				<MapIcon /> Map</button
			>
		{/if}

		{#if envId === 'undefined'}
			<SelectEnvironment {envId} open={true} mandatory={true} />
		{/if}
	</div>
</Authenticated>
