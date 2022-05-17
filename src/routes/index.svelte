<script>
	import TopicMap from '$lib/TopicMap.svelte';
	import Slider from '$lib/Slider.svelte';
	import tickleData from '../data';
</script>

<div class="flex flex-col">
	<Slider cards={tickleData} />
	<div class="mx-auto">
		<TopicMap />
	</div>
</div>
