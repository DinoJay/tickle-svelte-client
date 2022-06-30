<script>
	export let questions;
	export let title;
	export let quizInformation;

	const getObject = (id) => {
		return quizInformation.response.some((item) => Object.keys(item)[0] === id);
	};

	console.log(quizInformation);
</script>

<div class="p-3 overflow-y-auto">
	<h2 class="text-xl">Results: {title}</h2>
	{#each questions as q, i}
		<div class={i < questions.length ? 'mb-3' : ''}>
			<p class="text-lg">{q.text}</p>

			<div class="ml-6">
				{#each q.answers as a}
					<div class="flex items-center">
						<div class="mr-1">{a.text}</div>
						<div class="text-lg ">
							{getObject(a.id) ? '✓' : 'x'}
						</div>
						<div class="text-lg {a.correct ? 'text-green-600' : 'text-red-600'}">
							{a.correct ? '(✓)' : '(x)'}
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/each}
</div>
