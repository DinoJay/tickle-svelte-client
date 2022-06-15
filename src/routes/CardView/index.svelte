<script>
	import TopicMap from '$lib/TopicMap.svelte';
	import Slider from '$lib/Slider.svelte';
	import tickleData from '/src/data';
	import SelectEnvironment from '$lib/components/SelectEnvironment/index.svelte';
	import Authenticated from '$lib/components/auth/Authenticated.svelte';
	import Map from './Map.svelte';
	import { db } from '$lib/firebaseConfig/firebase';
	import { collection, getDocs } from 'firebase/firestore';
	import { store } from '/src/stores/index';
	import MapIcon from 'svelte-material-icons/MapMarker.svelte';
	import WatchGeoLoc from '$lib/components/WatchGeoLoc.svelte';
	import { finishDraft } from 'immer';

	let selected = null;
	let map = false;

	$: centerLoc = tickleData.find((d) => d.id === selected)?.loc?.value;
	$: console.log('center', centerLoc);
</script>

<Authenticated>
	<WatchGeoLoc>
		<div class="flex flex-col relative h-[calc(100%-78px)] w-full">
			<div class="mb-2 z-10">
				<Slider {selected} cards={tickleData} onClick={(id) => (selected = id)} />
			</div>

			{#if !map}
				<div class="mx-auto">
					<TopicMap selectedId={selected} onClick={(id) => (selected = id)} />
				</div>
			{:else}
				<div class="absolute h-full w-full z-0">
					<Map
						center={[centerLoc?.latitude, centerLoc?.longitude]}
						data={tickleData}
						onClick={(id) => (selected = id)}
					/>
				</div>
			{/if}

			<button
				on:click={() => (map = !map)}
				class="{map ? 'bg-teal-500' : 'bg-gray-300'} 
			absolute btn w-32 h-8 bottom-5 right-0 flex justify-center items-center border-2 border-black "
			>
				<MapIcon /> Map</button
			>

			<SelectEnvironment />
		</div>
	</WatchGeoLoc>
</Authenticated>
