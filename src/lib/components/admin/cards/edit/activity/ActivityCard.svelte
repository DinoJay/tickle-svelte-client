<script>
	import { db } from '$lib/firebaseConfig/firebase';
	import { doc, getDoc, updateDoc } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import HangmanActivity from './hangman/HangmanActivity.svelte';
	import QuizActivity from './quiz/QuizActivity.svelte';
	import EditText from '$lib/components/admin/utils/editBlocks/EditText.svelte';

	export let currentCard = {};
	export let selectedEnvironment = '';
	export let docRef = null;

	let height = 600;
	let width = 400;

	let activities = ['Quiz', 'Hangman'];
	let currentActivity = { type: 'default', value: { title: '', word: '', questions: [] } };

	/**
	 * LightBox height width for mobile
	 */
	onMount(() => {
		if (window.innerWidth < width) width = window.innerWidth;
		if (window.innerHeight < height) height = window.innerHeight;
	});

	/**
	 * Get the activity from the card
	 */
	if (currentCard.id) {
		getDoc(doc(db, 'card-envs', selectedEnvironment, 'cards', currentCard.id)).then((snap) => {
			if (snap.data()?.activity) {
				currentActivity = snap.data()?.activity;
			}
		});
	}

	/**
	 * It saves the activity in Firebase when a value is changed
	 */
	async function saveActivity() {
		currentActivity.value.questions = [...currentActivity.value.questions];
		updateDoc(docRef, {
			activity: currentActivity
		});
	}
</script>

<div class="flex flex-col bg-white overflow-y-auto" style="height: {height}px;width: {width}px;">
	<div class="h-[3rem] w-full text-center mt-[3%]">
		<select
			id="activitySelector"
			class="sm:w-[60%] w-[80%] mt-2 h-8
                rounded-lg bg-c-light-gray"
			bind:value={currentActivity.type}
			on:change={() => saveActivity()}
		>
			<option value="default">Choose an activity</option>
			{#each activities as activity}
				<option value={activity}>
					{activity}
				</option>
			{/each}
		</select>
	</div>

	<EditText
		labelName={'Title'}
		labelFor={'title'}
		bind:bindValue={currentActivity.value.title}
		onInput={() => saveActivity()}
	/>

	{#if currentActivity.type == 'Hangman'}
		<HangmanActivity bind:word={currentActivity.value.word} saveActivity={() => saveActivity()} />
	{:else if currentActivity.type == 'Quiz'}
		<QuizActivity
			{height}
			{width}
			bind:questions={currentActivity.value.questions}
			saveActivity={() => saveActivity()}
		/>
	{/if}
</div>
