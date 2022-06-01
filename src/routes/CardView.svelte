<script>
	import TopicMap from '$lib/TopicMap.svelte';
	import Slider from '$lib/Slider.svelte';
	import SelectEnvironment from '$lib/components/SelectEnvironment/index.svelte';
	import tickleData from '../data';

	let selected = null;
</script>

<div class="flex flex-col">
	<Slider {selected} cards={tickleData} onClick={(id) => (selected = id)} />
	<div class="mx-auto">
		<TopicMap selectedId={selected} onClick={(id) => (selected = id)} />
	</div>
	<SelectEnvironment />
</div>
