<script>
	import { loadCardEnvironments } from '/src/stores/index';
</script>

{#await loadCardEnvironments() then _}
	<slot />
{/await}
