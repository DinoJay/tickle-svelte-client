<script>
	import HomeNav from './HomeNav.svelte';
	import HomeSlider from './HomeSlider.svelte';

	let selectedIcon = 'cards';
</script>

<div class="h-[calc(100vh-4rem)] relative">
	<HomeNav {selectedIcon} onClick={(icon) => (selectedIcon = icon)} />

	<HomeSlider {selectedIcon} />
</div>
