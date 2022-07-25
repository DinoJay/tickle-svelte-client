<script>
	import { getContext } from 'svelte';
	import { key } from '../mapbox.js';

	const { getMap } = getContext(key);
	const map = getMap();

	export let lat;
	export let lon;
	export let userAvatar;

	$: pos = lon && lat ? map.project([lon, lat]) : { x: 0, y: 0 };

	map.on('move', () => {
		pos = lon && lat ? map.project([lon, lat]) : { x: 0, y: 0 };
	});
</script>

<div class="absolute text-2xl" style="left:{pos.x}px;top:{pos.y}px">
	<img src={'/avatars/' + userAvatar + '.svg'} alt={userAvatar} />
</div>
