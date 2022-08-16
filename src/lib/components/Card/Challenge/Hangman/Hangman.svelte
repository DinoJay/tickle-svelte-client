<script>
	import { db } from '$lib/firebaseConfig/firebase';
	import { addDoc, collection, updateDoc } from 'firebase/firestore';
	import { onDestroy, onMount } from 'svelte';
	import MobileKeyboard from './MobileKeyboard.svelte';

	export let activity;
	export let activityInformation = {};

	const word = activity.value.word.toLowerCase();
	const title = activity.value.title;

	let wrongLetters = [];
	let rightLetters = [];
	let hangmanPosition = 1;
	let victory = false;
	let gameOver = false;
	let gameOverSrc = '/hangman/gameover.svg';
	let status = 'Sending your results...';

	// Initialization
	for (let letter of word) {
		let find = false;
		let value = letter;
		if (letter == ' ') {
			find = true;
			value = '&nbsp';
		}
		rightLetters = [...rightLetters, { value, find }];
	}

	/**
	 * Listener on keydown for computer
	 */
	onMount(() => {
		window.addEventListener('keydown', game);
	});

	onDestroy(() => {
		window.removeEventListener('keydown', game);
	});

	/**
	 * Game algorithm
	 * @param event
	 */
	const game = (event) => {
		var keyCode = event.keyCode;
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
		activityInformation.completed = completed;
		activityInformation.succeeded = succeeded;
		activityInformation.score = score;
		activityInformation.maxScore = maxScore;
		addDoc(
			collection(db, 'users', activityInformation.uid, 'activitySubmissions'),
			activityInformation
		).then((next) => {
			updateDoc(next, {
				id: next.id
			});
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

	<div class="mx-auto my-5 px-2 text-3xl">
		{#each rightLetters as rLetter}
			<span>
				{#if rLetter.find}
					{@html rLetter.value}
				{:else}
					_
				{/if}
			</span>
		{/each}
	</div>

	<MobileKeyboard onClick={(keyCode) => game(keyCode)} {wrongLetters} {rightLetters} />

	{#if gameOver}
		<img
			class="h-32 w-32 m-auto 
				absolute top-[calc(50%-4rem)] left-[calc(50%-4rem)]"
			src={gameOverSrc}
			alt="gameover"
		/>
	{/if}

	<div
		class="flex h-[10%] w-full  mt-auto p-3
        	bg-c-black text-xl text-white"
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
