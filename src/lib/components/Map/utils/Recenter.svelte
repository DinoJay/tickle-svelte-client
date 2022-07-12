<script>
	import { getContext } from 'svelte';
	import { key } from '../mapbox.js';

	const { getMap } = getContext(key);
	const map = getMap();

	export let lat;
	export let lon;
	export let userAvatar;
	export let onClick;

	const recenter = () => {
		map.flyTo({
			center: [lon, lat],
			essential: true
		});
	};
</script>

<button
	on:click={() => {
		recenter();
		onClick();
	}}
	class="flex h-16 w-16 bg-c-light-green absolute bottom-8 left-5 rounded-full 
		hover:bg-c-green border-2 border-black"
>
	<img class="m-auto" src={'/avatars/' + userAvatar + '.svg'} alt={userAvatar} />
</button>
