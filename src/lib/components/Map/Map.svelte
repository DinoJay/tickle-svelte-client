<script>
	import Located from '$lib/components/geoLocation/Located.svelte';
	import ImgMarker from '$lib/components/map/markers/ImgMarker.svelte';
	import Mapbox from '$lib/components/map/Mapbox.svelte';
	import MapMarker from '$lib/components/map/markers/MapMarker.svelte';
	import Recenter from '$lib/components/map/utils/Recenter.svelte';
	import { store } from '/src/stores/index';

	export let data;
	export let onClick;
	export let center;

	let userAvatar = $store.currentUser.avatar;

	$: userLoc = $store.currentUser.location;
</script>

<Located>
	<Mapbox lat={center[0]} lon={center[1]} zoom={13}>
		{#each data as card (card.id)}
			<MapMarker
				onClick={() => onClick(card.id)}
				lon={card.loc.value.longitude}
				lat={card.loc.value.latitude}
				label={card.title.value}
			/>
		{/each}
		<ImgMarker {...userLoc} {userAvatar} />
		<Recenter {...userLoc} {userAvatar} onClick={() => onClick(null)} />
	</Mapbox>
</Located>
