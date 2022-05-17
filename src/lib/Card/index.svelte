<script>
	export let title;
	export let description;
	export let img;
</script>

<div class="border-2 p-3 bg-white flex flex-col" style="width:400px;height:600px">
	<h1 class="text-xl">{title}</h1>
	<img src={img} class="mb-3 object-contain w-full" style="height:300px" />
	<p class="h-40 overflow-y-auto mb-3">{description}</p>
	<button class="border-2 p-2 mt-auto text-xl w-full">Challenge</button>
</div>
