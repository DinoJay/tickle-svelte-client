<script>
	export let addButtonContent = '';
	export let onClick = () => {};
</script>

<button
	class="flex h-[2rem] w-full
	whitespace-nowrap text-ellipsis text-white
	bg-c-black hover:bg-c-gray transition-colors"
	on:click={() => onClick()}
>
	<p class="m-auto">
		{addButtonContent}
	</p>
</button>
