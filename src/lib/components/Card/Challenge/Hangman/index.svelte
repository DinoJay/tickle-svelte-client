<script>
	import { db } from '$lib/firebaseConfig/firebase';
	import { addDoc, collection } from 'firebase/firestore';
	import { onMount } from 'svelte';

	export let datum;
	export let quizInformation;

	const {
		value: { word, title }
	} = datum;

	let wrongLetters = [];
	let rightLetters = [];
	let hangmanPosition = 1;
	let victory = false;
	let gameOver = false;
	let gameOverSrc = '/hangman/gameover.svg';
	let status = 'The results will be sent to the database...';

	// Initialization
	for (let letter of word) {
		rightLetters = [...rightLetters, { value: letter, find: false }];
	}

	onMount(() => {
		window.addEventListener('keypress', (event) => {
			// Body guard
			if (gameOver) return;
			if (wrongLetters.includes(event.key)) return;

			// We check how many letters match with the key pressed
			let letters = rightLetters.map((letter) => letter.value == event.key);

			if (letters.includes(true)) {
				// We truned the right letters as true
				for (let i = 0; i < letters.length; i++) {
					if (letters[i]) rightLetters[i].find = true;
				}

				// If all the letters are true, the player wins
				let isWin = rightLetters.map((letter) => letter.find == true);
				if (!isWin.includes(false)) {
					console.log('non');
					victory = true;
					sendResults(true, true, 50, 50);
				}
			} else {
				wrongLetters = [...wrongLetters, event.key];
				hangmanPosition++;
				if (hangmanPosition == 8) {
					gameOver = true;
					sendResults(true, false, 0, 50);
					gameOverAnimation();
				}
			}
		});
	});

	/**
	 * Send the result of the activity to the database
	 * @param completed
	 * @param succeeded
	 * @param score
	 * @param maxScore
	 */
	const sendResults = (completed, succeeded, score, maxScore) => {
		quizInformation.completed = completed;
		quizInformation.succeeded = succeeded;
		quizInformation.score = score;
		quizInformation.maxScore = maxScore;
		addDoc(
			collection(db, 'users', quizInformation.uid, 'activitySubmissions'),
			quizInformation
		).then(() => {
			status = 'We have received your results ✓';
		});
	};

	/**
	 * Play an animation for the gameover.svg
	 */
	const gameOverAnimation = () => {
		setInterval(() => {
			if (gameOverSrc == '/hangman/gameover.svg') {
				gameOverSrc = '/hangman/gameover2.svg';
			} else {
				gameOverSrc = '/hangman/gameover.svg';
			}
		}, 500);
	};
</script>

<div class="flex flex-col h-screen w-screen max-h-[600px] max-w-[400px]">
	<h1 class="text-xl mb-2 p-2">{title}</h1>

	<div class="mt-8 mx-auto w-48 h-48">
		<img
			class="h-full w-full"
			src="/hangman/hangman{hangmanPosition}.svg"
			alt="hangman{hangmanPosition}"
		/>
	</div>

	<div
		class="flex justify-center items-center 
        h-16 w-full px-2 py-5 
        text-xl text-red-400 border-b border-black"
	>
		{#each wrongLetters as wLetter}
			{wLetter} &nbsp;
		{/each}
	</div>

	<div class="mx-auto my-5 text-3xl">
		{#each rightLetters as rLetter}
			<span>
				{#if rLetter.find}
					{rLetter.value}
				{:else}
					_
				{/if}
			</span>
		{/each}
	</div>

	{#if gameOver}
		<img class="h-24 w-24 m-auto" src={gameOverSrc} alt="gameover" />
	{/if}

	<div
		class="flex h-[10%] w-full  mt-auto p-3
        bg-c-dark-brown text-xl text-white"
	>
		<div class="m-auto">
			{#if gameOver || victory}
				{status}
			{:else}
				Guess the word
			{/if}
		</div>
	</div>
</div>
