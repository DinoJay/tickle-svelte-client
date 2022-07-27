<script>
	import { db } from '$lib/firebaseConfig/firebase';
	import { addDoc, collection } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import MobileKeyboard from './MobileKeyboard.svelte';

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
	let status = 'Sending your results...';

	// Initialization
	for (let letter of word) {
		rightLetters = [...rightLetters, { value: letter, find: false }];
	}

	onMount(() => {
		window.addEventListener('keydown', (event) => {
			game(event.keyCode);
		});
	});

	const game = (keyCode) => {
		let key = String.fromCharCode(keyCode).toLocaleLowerCase();

		// Body guard
		if (gameOver) return;
		if (wrongLetters.includes(key)) return;

		// We check how many letters match with the key pressed
		let letters = rightLetters.map((letter) => letter.value == key);

		if (letters.includes(true)) {
			// We truned the right letters as true
			for (let i = 0; i < letters.length; i++) {
				if (letters[i]) rightLetters[i].find = true;
			}

			// If all the letters are true, the player wins
			let isWin = rightLetters.map((letter) => letter.find == true);
			if (!isWin.includes(false)) {
				victory = true;
				sendResults(true, true, 50, 50);
			}
		} else {
			wrongLetters = [...wrongLetters, key];
			hangmanPosition++;
			if (hangmanPosition == 8) {
				gameOver = true;
				sendResults(true, false, 0, 50);
				gameOverAnimation();
			}
		}
	};

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

	<div class="sm:h-48 sm:w-48 w-16 h-16 mt-8 mx-auto  ">
		<img
			class="h-full w-full"
			src="/hangman/hangman{hangmanPosition}.svg"
			alt="hangman{hangmanPosition}"
		/>
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

	<MobileKeyboard onClick={(keyCode) => game(keyCode)} {wrongLetters} {rightLetters} />

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
