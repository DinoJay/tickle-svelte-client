<script>
	import { onMount } from 'svelte';
	import { db } from '$lib/firebaseConfig/firebase';
	import { collection, getDocs } from 'firebase/firestore';
	import { store } from '/src/stores/index';
	import LightBox from '$lib/components/utils/LightBox.svelte';
	import Quiz from '$lib/components/card/challenge/quiz/Quiz.svelte';
	import Hangman from '$lib/components/card/challenge/hangman/Hangman.svelte';

	export let title = '';
	export let description = '';
	export let img = '';
	export let activity = '';
	export let id = '';
	export let envId = '';

	let allowed = false;
	let challengeButtonContent = '...';

	let isOpen = false;
	var width = 400;
	var height = 600;

	let activityInformation = {
		completed: false,
		date: new Date().getTime(),
		cardId: id,
		envId: envId,
		type: activity?.type,
		succeeded: false,
		uid: $store.currentUser.uid,
		score: 0
	};

	/**
	 * LightBox height width for mobile
	 */
	onMount(() => {
		if (window.innerWidth < width) width = window.innerWidth;
		if (window.innerHeight < height) height = window.innerHeight;
	});

	/**
	 * Check if the user alredy did the activity
	 */
	async function isUserAllowed() {
		allowed = true;
		var snapRef = await getDocs(
			collection(db, 'users', $store.currentUser.uid, 'activitySubmissions')
		);
		var submissions = snapRef.docs.map((doc) => {
			return doc.data();
		});

		submissions.forEach((submission) => {
			if (submission.cardId == id) {
				allowed = false;
				challengeButtonContent =
					'Completed - score : ' + submission.score + '/' + submission.maxScore;
			}
		});

		if (allowed) challengeButtonContent = 'Challenge';
	}

	isUserAllowed();
</script>

<div class="flex flex-col p-3 bg-white" style="width:{width}px;height:{height}px">
	<h1 class="text-xl">
		{title}
	</h1>
	<img src={img} alt={title} class="w-full mb-3 object-contain " style="height:300px" />
	<p class="h-40 mb-3 overflow-y-auto ">
		{description}
	</p>
	<button
		on:click={() => {
			if (allowed) isOpen = !isOpen;
		}}
		class="h-[10%] w-full absolute left-0 bottom-0
			bg-c-black text-white text-xl 
			{allowed ? '' : 'cursor-not-allowed'}"
	>
		{challengeButtonContent}
	</button>
</div>

{#if activity?.value}
	<LightBox
		{isOpen}
		{width}
		{height}
		close={() => {
			isOpen = false;
			allowed = false;
			isUserAllowed();
		}}
	>
		{#if activity.type == 'Quiz'}
			<Quiz {activity} {activityInformation} />
		{:else if activity.type == 'Hangman'}
			<Hangman {activity} {activityInformation} />
		{/if}
	</LightBox>
{/if}
