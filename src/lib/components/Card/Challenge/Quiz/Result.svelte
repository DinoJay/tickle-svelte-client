<script>
	import { get } from 'svelte/store';

	export let questions;
	export let title;
	export let userResponses;

	// faire un tableau qui recupere que les bonnes reponses OK
	// comparer la taille de ce tableau a celui des reponses de l uti OK
	// puis regarder si chaque bonne reponse est dans celui des reponses de l uti OK
	// rendre userResponses iterable (le transformer en obj et on fait obj.counter) OK
	// vider les checkboxs entre chaque question

	$: console.log('userRESPONSE', userResponses);

	let responses = questions.map((question) =>
		question.answers
			.map((ans) => {
				if (ans.correct) return ans.text;
			})
			.filter((e) => e)
	);

	const checkResp = (i) => {
		let res = true;
		if (responses[i].length !== userResponses[i].length) res = false;
		responses[i].forEach((resp) => {
			if (!userResponses[i].includes(resp)) res = false;
		});
		return res;
	};

	const getColor = (i, j) => (checkResp(i) ? 'text-green-600' : 'text-red-600');
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
						<div class="text-lg {getColor(i)}">
							{userResponses[i].includes(a.text) ? '✓' : 'x'}
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
