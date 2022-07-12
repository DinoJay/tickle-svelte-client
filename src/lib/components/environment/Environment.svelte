<script>
	import { goto } from '$app/navigation';

	export let id;
	export let name;
	export let description;
	export let img;
	export let openId;
	export let onClick;
	export let open;

	export let el;
</script>

<div bind:this={el} class="overflow-y-auto">
	<h2>
		<button
			on:click={() => {
				onClick(openId === id ? null : id);
			}}
		>
			<h2 class="flex items-center text-xl">
				<span class="mr-1 ">{openId === id ? '🤯' : '🙂'}</span>
				<span>{name}</span>
			</h2>
		</button>
	</h2>
	{#if openId === id}
		<div class="my-2">
			<img class="w-full object-contain h-96" src={img?.url || '/tickle.svg'} alt={name} />
			<div>
				<p class="mb-3">
					{description}
				</p>
				<button
					class="border border-gray-300 border-3 w-full p-2 text-xl"
					on:click={() => {
						openId = null;
						goto(`/CardView/env/${id}`);
					}}>Go!</button
				>
			</div>
		</div>
	{/if}
</div>

<style>
	.extended {
		@apply max-h-96;
		min-height: 30rem;
	}
</style>
