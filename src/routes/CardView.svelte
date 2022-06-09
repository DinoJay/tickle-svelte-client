<script>
	import TopicMap from '$lib/TopicMap.svelte';
	import Slider from '$lib/Slider.svelte';
	import tickleData from '../data';
	import SelectEnvironment from '$lib/components/SelectEnvironment/index.svelte';
	import Authenticated from '$lib/components/auth/Authenticated.svelte';
	import Map from '$lib/components/Map/index.svelte';
	import MapMarker from '$lib/components/Map/MapMarker.svelte';
	import { db } from '$lib/firebaseConfig/firebase';
	import { collection, getDocs } from 'firebase/firestore';
	import { store } from '/src/store';
	import MapIcon from 'svelte-material-icons/MapMarker.svelte';

	let selected = null;
	let map = false;

	const loadCardEnvironments = getDocs(collection(db, 'card-environments'))
		.then((snap) => {
			store.update((obj) => ({ ...obj, envs: snap.docs.map((d) => d.data()) }));
		})
		.catch((error) => {
			console.log(error);
		});

	console.log(tickleData);
</script>

<Authenticated>
	<div class="flex flex-col relative h-[calc(100%-78px)] w-full">
		<div class="mb-2">
			<Slider {selected} cards={tickleData} onClick={(id) => (selected = id)} />
		</div>

		{#if !map}
			<div class="mx-auto">
				<TopicMap selectedId={selected} onClick={(id) => (selected = id)} />
			</div>
		{:else}
			<Map lat={50} lon={4} zoom={3.5}>
				{#each tickleData as card}
					<MapMarker
						lat={card.loc.value.latitude}
						lon={card.loc.value.longitude}
						label={card.title.value}
					/>
				{/each}
			</Map>
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
</Authenticated>
