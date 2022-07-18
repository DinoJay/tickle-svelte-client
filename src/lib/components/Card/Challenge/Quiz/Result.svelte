<script>
	import { db } from '$lib/firebaseConfig/firebase';
	import { collection, addDoc } from 'firebase/firestore';

	export let questions;
	export let title;
	export let quizInformation;

	let status = 'The results will be sent to the database...';

	/**
	 * Method to know if the id of the response from the object questions is the same as
	 * the response from the object quizInformation
	 * @param id - the reponse's id
	 */
	const getObject = (id) => {
		return quizInformation.response.some((item) => Object.keys(item)[0] === id);
	};

	/**
	 * Method to update the information of the quizInformation : succeeded, completed and score
	 */
	const updateQuizInfo = () => {
		let maxScore = 10 * questions.length;
		let score = 0;
		quizInformation.succeeded = true;
		quizInformation.completed = true;

		if (!quizInformation.response.length == questions.length) {
			quizInformation.succeeded = false;
		}

		quizInformation.response.forEach((resp) => {
			if (!Object.values(resp)[0]) {
				quizInformation.succeeded = false;
				score -= 10;
			} else {
				score += 10;
			}
		});

		quizInformation.score = score;
		quizInformation.maxScore = maxScore;

		addDoc(
			collection(db, 'users', quizInformation.uid, 'activitySubmissions'),
			quizInformation
		).then(() => {
			status = 'We have received your results ✓';
		});
	};

	updateQuizInfo();
</script>

<div class="h-[90%] p-3 bg-white overflow-y-auto ">
	<h2 class="text-xl">
		Results: {title}
	</h2>
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
	<div class="flex h-[10%] w-full p-3 bg-c-dark-brown absolute left-0 bottom-0">
		<p class="m-auto text-white">{status}</p>
	</div>
</div>
