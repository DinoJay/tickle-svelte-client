<script>
	export let img;
	export let title;
	export let alt;
</script>

<div class="bg-white relative border-2 border-gray-600 p-2 drop-shadow-md">
	<div class="w-28 h-36 flex flex-col overflow-hidden">
		<h1 class=" shrink-0 title">{title}</h1>
		<img class=" flex-grow object-cover" src={img} {alt} />
	</div>
</div>

<style>
	.title {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
