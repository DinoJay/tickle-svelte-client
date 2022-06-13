<script>
	import { fade } from 'svelte/transition';

	export let title;
	export let img;
	export let answers;
	export let text;
	export let height;
	export let addResponse;
	export let response;

	// $: addResponse(response);
</script>

<div class="flex-grow flex flex-col p-2">
	<h2 class="text-xl mb-2">{title}</h2>
	<img class="object-cover w-full flex-grow shrink" style="max-height:200px" src={img.url} />
	<div class="p-2">
		<p class="text-xl">{text}</p>
		<div class="mt-2">
			{#each answers as a, i}
				<div class="text-lg text-gray-600">
					<input
						type="checkbox"
						bind:checked={response[i]}
						on:change={(e) => {
							addResponse(response.map((a, j) => (i === j ? e.target.checked : a)));
						}}
					/>
					<label for="vehicle1"> {a.text}</label><br />
				</div>
			{/each}
		</div>
	</div>
</div>
