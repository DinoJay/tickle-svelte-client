<script>
	import { getContext } from 'svelte';
	import { key } from './mapbox.js';

	const { getMap } = getContext(key);
	const map = getMap();

	export let lat;
	export let lon;
	export let userAvatar;

	const recenter = () => {
		map.flyTo({
			center: [lon, lat],
			essential: true
		});
	};
</script>

<button
	on:click={() => recenter()}
	class="h-16 w-16 bg-teal-500 absolute bottom-10 left-0 flex rounded-full 
hover:bg-teal-300"
>
	<img class="m-auto" src={'/avatars/' + userAvatar + '.svg'} alt={userAvatar} />
</button>
