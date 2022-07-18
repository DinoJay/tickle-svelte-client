<script>
	import { db } from '$lib/firebaseConfig/firebase';
	import LightBox from '$lib/LightBox.svelte';
	import { collection, getDocs } from 'firebase/firestore';
	import Quiz from './Challenge/Quiz/index.svelte';
	import { store } from '/src/stores/index';

	export let title;
	export let description;
	export let img;
	export let activity;
	export let id;
	export let envId;

	let allowed = true;
	let challengeButtonContent = '...';

	let open = false;
	const width = 400;
	const height = 600;

	const getQuizProps = () => ({
		datum: activity,
		cardId: id,
		envId: envId,
		width: 400,
		height: 600
	});

	/**
	 * Check if the user alredy did the activity
	 */
	async function isUserAllowed() {
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
	<img src={img} alt={title} class="mb-3 object-contain w-full" style="height:300px" />
	<p class="h-40 overflow-y-auto mb-3">
		{description}
	</p>
	<button
		on:click={() => {
			if (allowed) open = !open;
		}}
		class=" h-[10%] w-full bg-c-dark-brown text-white  text-xl absolute left-0 bottom-0
			{allowed ? '' : 'cursor-not-allowed'}"
	>
		{challengeButtonContent}
	</button>
</div>

{#if activity.value}
	<LightBox
		{open}
		{activity}
		{width}
		{height}
		close={() => {
			open = false;
			isUserAllowed();
		}}
	>
		<Quiz {...getQuizProps()} />
	</LightBox>
{/if}
