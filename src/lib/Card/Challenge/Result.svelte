<script>
	import { get } from 'svelte/store';

	export let questions;
	export let response;
	export let title;

	$: console.log('questions', questions);

	const checkResp = (i, j) => questions[i].answers[j].correct === response[i][j];
	const getColor = (i, j) => (checkResp(i, j) ? 'text-green-600' : 'text-red-600');
</script>

<div class="p-3 overflow-y-auto">
	<h2 class="text-xl">Results: {title}</h2>
	{#each questions as q, i}
		<div class={i < questions.length ? 'mb-3' : ''}>
			<p class="text-lg">{q.text}</p>
			<div class="ml-6">
				{#each q.answers as a, j}
					<div class="flex items-center">
						<div class="mr-1">{a.text}</div>
						<div class="text-lg {getColor(i, j)}">
							{response[i][j] ? '✓' : 'x'}
						</div>
						<div class="text-lg {getColor(i, j)}">{a.correct ? '(✓)' : '(x)'}</div>
					</div>
				{/each}
			</div>
		</div>
	{/each}
</div>
