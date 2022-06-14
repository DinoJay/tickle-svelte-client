<script>
	import ImgMarker from '$lib/components/Map/ImgMarker.svelte';
	import Map from '$lib/components/Map/index.svelte';
	import MapMarker from '$lib/components/Map/MapMarker.svelte';

	export let data;
	export let onClick;
</script>

<Map lat={0} lon={0} zoom={13}>
	{#each data as card}
		<MapMarker
			onClick={() => onClick(card.id)}
			lat={card.loc.value.latitude}
			lon={card.loc.value.longitude}
			label={card.title.value}
		/>
		<ImgMarker />
	{/each}
</Map>
