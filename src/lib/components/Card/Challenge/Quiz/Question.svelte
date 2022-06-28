<script>
	export let title;
	export let img = null;
	export let answers;
	export let text;
	export let height;
	export let userResponses;
	export let counter;

	var responses = [];
</script>

<div class="flex-grow flex flex-col p-2">
	<h2 class="text-xl mb-2">{title}</h2>
	{#if img}
		<img class="object-cover w-full flex-grow shrink" style="max-height:200px" src={img.url} />
	{/if}

	<div class="p-2">
		<p class="text-xl">{text}</p>
		<div class="mt-2">
			{#each answers as a, i}
				<div class="text-lg text-gray-600">
					<input
						type="checkbox"
						id={a.id}
						on:change={(e) => {
							if (e.target.checked) {
								responses.push(a.text);
							} else {
								responses.splice(responses.indexOf(a.text), 1);
							}

							userResponses[counter] = [...responses];
							console.log('counter', counter);
							console.log('urep', userResponses);
						}}
					/>
					<label for={a.id}> {a.text}</label><br />
				</div>
			{/each}
		</div>
	</div>
</div>
