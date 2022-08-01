<script>
	export let card;
</script>

<div
	class="h-[18rem] w-[12rem] mx-auto m-3 relative
            border-2 border-c-black bg-white  hover:scale-105"
>
	<h1 class="h-[4rem] font-medium text-ellipsis overflow-hidden">
		{card.title.value}
	</h1>

	<img
		src={card.img.value.url}
		alt={card.title.value}
		class="h-[107px] w-[180px] mt-12 mx-auto  
                border border-black object-cover"
	/>
	<div
		class="flex h-10 w-full absolute bottom-0 
            bg-c-black text-white"
	>
		<p class="m-auto">Score : {card.score} / {card.maxScore}</p>
	</div>
</div>
