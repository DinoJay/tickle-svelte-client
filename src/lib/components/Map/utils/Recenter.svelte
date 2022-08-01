<script>
	import { getContext } from 'svelte';
	import { key } from '../mapbox.js';

	const { getMap } = getContext(key);
	const map = getMap();

	export let lon = 0;
	export let lat = 0;
	export let userAvatar = 'nerd';
	// When we recenter we set the selected card as null
	export let onClick = () => {};

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
	class="flex h-16 w-16 
		absolute bottom-8 left-5 rounded-full 
		bg-c-light-green hover:bg-c-green border-2 border-black"
>
	<img class="m-auto" src={'/avatars/' + userAvatar + '.svg'} alt={userAvatar} />
</button>
