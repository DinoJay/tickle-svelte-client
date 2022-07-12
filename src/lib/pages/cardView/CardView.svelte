<script>
	import TopicMap from '$lib/TopicMap.svelte';
	import Slider from '$lib/Slider.svelte';
	import SelectEnvironment from '$lib/components/environment/EnvironmentSelector.svelte';
	import Map from '../../components/map/Map.svelte';
	import { store } from '/src/stores/index';
	import MapButton from './MapButton.svelte';

	export let envId;
	let selectedCard = null;
	let map = false;
	let centerLoc = null;
	let cards = [];

	$: if ($store) cards = $store?.envs?.find((env) => env.id === envId)?.cards;
	$: if (cards) centerLoc = cards.find((d) => d.id === selectedCard)?.loc?.value;
</script>

<div class="flex flex-col h-[calc(100vh-4rem)] w-full relative">
	{#if cards?.length > 0}
		<Slider {selectedCard} {cards} onClick={(id) => (selectedCard = id)} />

		{#if !map}
			<TopicMap {selectedCard} {cards} onClick={(id) => (selectedCard = id)} />
		{:else}
			<Map
				center={[centerLoc?.latitude, centerLoc?.longitude]}
				data={cards}
				onClick={(id) => (selectedCard = id)}
			/>
		{/if}

		<MapButton {map} onClick={() => (map = !map)} />
	{/if}

	{#if envId === 'undefined'}
		<SelectEnvironment {envId} open={true} mandatory={true} />
	{/if}
</div>
