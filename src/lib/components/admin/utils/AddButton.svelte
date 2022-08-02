<script>
	export let footerContent = '';
	export let onClick = () => {};
</script>

<button
	class="flex h-[2rem] w-full
	whitespace-nowrap text-ellipsis text-white
	bg-c-black hover:bg-c-grey"
	on:click={() => onClick()}
>
	<p class="m-auto">
		{footerContent}
	</p>
</button>
