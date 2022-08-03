<script>
	import { store } from '/src/stores/index';
	import Located from '$lib/components/geoLocation/Located.svelte';
	import ImgMarker from '$lib/components/map/markers/ImgMarker.svelte';
	import Mapbox from '$lib/components/map/Mapbox.svelte';
	import MapMarker from '$lib/components/map/markers/MapMarker.svelte';
	import Recenter from '$lib/components/map/utils/Recenter.svelte';

	export let cards = [{}];
	export let onClick = () => {};
	export let centerLocation = { longitude: 0, latitude: 0 };

	let userAvatar = $store.currentUser?.avatar;

	$: userLocation = $store.currentUser?.location;
</script>

<Located>
	<Mapbox lon={centerLocation?.longitude} lat={centerLocation?.latitude} zoom={13}>
		{#each cards as card (card.id)}
			<MapMarker
				onClick={() => onClick(card.id)}
				lon={card.loc.longitude}
				lat={card.loc.latitude}
				label={card.title}
			/>
		{/each}
		<ImgMarker {...userLocation} {userAvatar} />
		<Recenter {...userLocation} {userAvatar} onClick={() => onClick(null)} />
	</Mapbox>
</Located>
