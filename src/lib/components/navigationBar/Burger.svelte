<script>
	import Menu from 'svelte-material-icons/Menu.svelte';
	import Close from 'svelte-material-icons/Close.svelte';
	import { scale } from 'svelte/transition';

	export let collapsed;

	let size = '32px';
</script>

<button on:click={() => (collapsed = !collapsed)}>
	{#if !collapsed}
		<div in:scale>
			<Menu {size} />
		</div>
	{:else}
		<div in:scale>
			<Close {size} />
		</div>
	{/if}
</button>
