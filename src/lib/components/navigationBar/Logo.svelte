<script>
	export let onClick = () => {};
	export let height = '4rem';
	export let width = '11rem';

	let logo = 'tickle';
</script>

<div
	id="logo"
	style="height: {height}; width: {width};"
	class="relative cursor-pointer hover:scale-105"
	on:click={() => onClick()}
>
	{#each logo as letter, i}
		<span class="absolute translate-anim-container" style="top:25%;left:{i * 25 + 5}px;">
			<img
				src="/abc_letters/{letter}.svg"
				alt={letter}
				class="h-8 w-8 translate-anim filter-white"
				style="animation-delay: {i / 10 + 0.1}s;"
			/>
		</span>
	{/each}
</div>

<style>
	.filter-white {
		filter: brightness(0) invert(1);
	}
</style>
