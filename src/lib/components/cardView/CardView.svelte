<script>
	import { store } from '/src/stores/index';
	import Slider from '$lib/components/cardView/utils/slider/Slider.svelte';
	import TopicMap from '$lib/components/cardView/utils/topicMap/TopicMap.svelte';
	import Map from '$lib/components/map/Map.svelte';
	import MapButton from '$lib/components/cardView/utils/MapButton.svelte';
	import SelectEnvironment from '$lib/components/environment/EnvironmentSelector.svelte';

	export let selectedEnvironment = 'undefined';

	let cards = [{}];
	let selectedCard = '';
	let map = false;
	let centerLocation = '';

	$: if ($store.envs) cards = $store.envs?.find((env) => env.id === selectedEnvironment)?.cards;
	$: if (cards) centerLocation = cards.find((card) => card.id === selectedCard)?.loc;
</script>

<div class="flex flex-col h-[calc(100vh-4rem)] w-full relative">
	{#if cards?.length > 0}
		<Slider {cards} {selectedEnvironment} {selectedCard} onClick={(id) => (selectedCard = id)} />

		<div class={!map ? 'visible' : 'invisible'}>
			<TopicMap
				{cards}
				{selectedCard}
				{selectedEnvironment}
				onClick={(id) => (selectedCard = id)}
			/>
		</div>

		<div class="absolute h-full w-full  {map ? 'visible' : 'invisible'}">
			<Map {cards} {centerLocation} onClick={(id) => (selectedCard = id)} />
		</div>

		<MapButton {map} onClick={() => (map = !map)} />
	{/if}

	{#if selectedEnvironment === 'undefined'}
		<SelectEnvironment {selectedEnvironment} isOpen={true} isMandatory={true} />
	{/if}
</div>
