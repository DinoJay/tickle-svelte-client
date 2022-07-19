<script>
	import CompassOutline from 'svelte-material-icons/CompassOutline.svelte';

	export let map;
	export let onClick;
</script>

<button
	on:click={() => onClick()}
	class="{map ? 'bg-c-light-green' : 'bg-c-light-red'} 
    flex items-center h-16 w-16 bottom-8 right-5 
    absolute border-2 border-black rounded-full"
>
	<span class="m-auto spinner"> <CompassOutline size={32} /></span>
</button>

<style>
	.spinner {
		animation-duration: 3s;
		animation-name: spin;
		animation-iteration-count: infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}

		50% {
			transform: rotate(180deg);
		}

		80% {
			transform: rotate(240deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
