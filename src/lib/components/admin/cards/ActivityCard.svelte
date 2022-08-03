<script>
	import { db } from '$lib/firebaseConfig/firebase';
	import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
	import { onMount } from 'svelte';

	export let currentCard = {};
	export let selectedEnvironment = '';
	export let docRef = null;

	let height = 600;
	let width = 400;

	let selectedActivity = 'default';
	let activities = ['Quiz', 'Hangman'];
	let currentActivity = null;

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
			currentActivity = snap.data()?.activity;
			if (currentActivity?.type) selectedActivity = currentActivity.type;
		});
	}
</script>

<div class="flex flex-col bg-white overflow-y-auto" style="height: {height}px;width: {width}px;">
	<div class="h-[3rem] w-full text-center mt-[3%]">
		<select
			id="activitySelector"
			bind:value={selectedActivity}
			class="sm:w-[60%] w-[90%] mt-2 h-8
                rounded-lg bg-c-light-gray"
		>
			<option value="default">Choose an activity</option>
			{#each activities as activity}
				<option value={activity}>
					{activity}
				</option>
			{/each}
		</select>
	</div>

	{#if selectedActivity == 'hangman'}
		TODO
	{/if}
</div>
