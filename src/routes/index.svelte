<script>
	import TopicMap from '$lib/TopicMap.svelte';
	import Slider from '$lib/Slider.svelte';
	import tickleData from '../data';
</script>

<div>
	<Slider cards={tickleData} />
	<TopicMap />
</div>
