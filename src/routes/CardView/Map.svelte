<script>
	import Map from '$lib/components/Map/index.svelte';
	import MapMarker from '$lib/components/Map/MapMarker.svelte';

	export let data;
	export let onClick;
</script>

<Map lat={50} lon={8} zoom={7}>
	{#each data as card}
		<MapMarker
			onClick={() => onClick(card.id)}
			lat={card.loc.value.latitude}
			lon={card.loc.value.longitude}
			label={card.title.value}
		/>
	{/each}
</Map>
