<script>
	export let element = {};
	export let currentElement = {};
	export let selectedElement = '';
	export let isLightBoxOpen = false;
	export let isCard = false;
	export let onClick = () => {
		selectElementOrOpenLightbox(element);
	};

	const selectElementOrOpenLightbox = (element) => {
		if (selectedElement != element.id) {
			selectedElement = element.id;
		} else {
			isLightBoxOpen = true;
			currentElement = element;
		}
	};
</script>

<div
	class="flex h-full w-full justify-center items-center
		whitespace-nowrap text-ellipsis cursor-pointer
		transition-colors
		{selectedElement == element.id ? 'bg-green-200 hover:bg-green-400' : 'hover:bg-c-gray'}
		{isCard ? 'flex-col' : ''}"
	on:click={() => onClick()}
>
	{#if element?.img && isCard}
		<div class="flex justify-center items-center h-[3rem] w-[14rem] px-1">
			<p class="overflow-hidden text-ellipsis text-center font-medium">
				{element.title}
			</p>
		</div>
		<img
			class="h-[9rem] w-full mt-auto"
			src={element?.img.url}
			alt={element?.img.name}
			style="object-fit: cover;"
		/>
	{:else}
		<p class="m-auto pl-[1.5rem] font-medium">
			{element?.name || element?.title}
		</p>
	{/if}
</div>
