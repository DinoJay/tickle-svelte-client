<script>
	/**
	 * Button used to add a new element
	 * footerContent - the content of the button
	 */
	export let footerContent = '';
	export let onClick = () => {};
</script>

<button
	class="flex h-[2rem] w-full
	whitespace-nowrap text-ellipsis
	bg-slate-500 hover:bg-slate-300"
	on:click={() => onClick()}
>
	<p class="m-auto">
		{footerContent}
	</p>
</button>
