<script>
	import { goto } from '$app/navigation';

	export let id = '';
	export let title = '';
	export let description = '';
	export let img = '';
	export let openEnv = '';
	export let onClick = () => {};
</script>

<div class="overflow-y-auto">
	<h2>
		<button
			on:click={() => {
				onClick(openEnv === id ? null : id);
			}}
		>
			<p class="flex items-center text-xl">
				<span class="mr-1 ">{openEnv === id ? '🤯' : '🙂'}</span>
				<span>{title}</span>
			</p>
		</button>
	</h2>
	{#if openEnv === id}
		<div class="my-2">
			<img class="h-96 w-full object-contain" src={img?.url || '/tickle.svg'} alt={img?.name} />
			<div>
				<p class="mb-3">
					{description}
				</p>
				<button
					class="w-full p-2 text-xl
						hover:bg-c-light-gray
						border border-black border-3"
					on:click={() => {
						goto(`/cardview/environment/${id}`);
					}}>Go!</button
				>
			</div>
		</div>
	{/if}
</div>
