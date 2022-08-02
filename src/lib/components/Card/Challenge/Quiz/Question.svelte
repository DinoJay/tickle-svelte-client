<script>
	export let title = '';
	export let img = '';
	export let answers = [];
	export let text = '';
	export let onChange = () => {};
	export let counter = 0;

	$: if (counter) {
		if (window.document)
			window.document.querySelectorAll('input').forEach((item) => (item.checked = false));
	}
</script>

<div class="flex-grow flex flex-col p-2">
	<h2 class="text-xl mb-2">{title}</h2>
	{#if img}
		<img class="object-cover w-full flex-grow shrink" style="max-height:200px" src={img.url} />
	{/if}

	<div class="p-2">
		<p class="text-xl">{text}</p>
		<div class="mt-2 ok">
			{#each answers as a}
				<div class="text-lg text-gray-600">
					<input
						type="checkbox"
						id={a.id}
						on:change={(e) => {
							let response = {};
							response[a.id] = a.correct;
							onChange(response);
						}}
					/>
					<label for={a.id}> {a.text}</label><br />
				</div>
			{/each}
		</div>
	</div>
</div>
