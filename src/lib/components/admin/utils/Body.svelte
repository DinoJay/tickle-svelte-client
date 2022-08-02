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

<p
	class="flex h-full w-full justify-center items-center
		whitespace-nowrap text-ellipsis cursor-pointer
		{selectedElement == element.id ? 'bg-green-200 hover:bg-green-400' : ' hover:bg-c-grey'}
		{isCard ? 'flex-col' : ''}"
	on:click={() => onClick()}
>
	{#if element?.img && isCard}
		<p
			class="h-[3rem] w-full
				text-ellipsis text-center"
		>
			{element.title.value}
		</p>
		<img
			class="h-[9rem] w-full"
			src={element.img.value.url}
			alt={element.img.value.name}
			style="object-fit: cover;"
		/>
	{:else}
		{element?.name || element?.title}
	{/if}
</p>
