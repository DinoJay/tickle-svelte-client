<script>
	import LightBox from '$lib/LightBox.svelte';
	import ShowCardEnv from '$lib/components/SelectEnvironment/ShowEnv.svelte';
	import { store } from '/src/store';

	let open = true;
</script>

<LightBox {open} close={() => (open = false)}>
	{#if $store.envs.length === 0}
		Loading...
	{:else}
		<ShowCardEnv />
	{/if}
</LightBox>

<style>
</style>
