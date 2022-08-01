<script>
	export let img;
	export let title;
	export let alt;
</script>

<div
	class="flex flex-col h-36 w-28 p-2 relative overflow-hidden
		bg-white border-2 border-gray-600 drop-shadow-md"
>
	<h1 class="shrink-0 title">{title}</h1>
	<img class="flex-grow object-cover" src={img} {alt} />
</div>

<style>
	.title {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
