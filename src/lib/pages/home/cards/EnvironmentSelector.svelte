<script>
	import TickleWobble from '$lib/components/utils/TickleWobble.svelte';
	import { db } from '$lib/firebaseConfig/firebase';
	import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
	import { store } from '/src/stores/index';

	export let selectedEnvironment = 'default';
	export let userCardsIdForEachEnv = {};
	let environments = {};

	/**
	 * Get all the submissions of the user
	 * Get all the environments from these submissions
	 */
	async function getEnvironments() {
		var snapRef = await getDocs(
			collection(db, 'users', $store.currentUser.uid, 'activitySubmissions')
		);
		var submissions = snapRef.docs.map((doc) => {
			return doc.data();
		});

		/**
		 * Get the name of the environment from the id of the environment stored in the submission
		 */
		submissions.forEach(async (submission) => {
			// Fill environments with the name of the environment
			if (!environments[submission.envId]) {
				var docRef = doc(db, 'card-environments', submission.envId);
				var docSnap = await getDoc(docRef);
				if (docSnap.exists()) environments[submission.envId] = docSnap.data().name;
			}

			// Fill userCardsIdForEachEnv with all the cards collected from the user for each environment
			if (!userCardsIdForEachEnv[submission.envId]) {
				userCardsIdForEachEnv[submission.envId] = [];
			}
			userCardsIdForEachEnv[submission.envId].push({
				id: submission.cardId,
				score: submission.score
			});
		});
	}
</script>

{#await getEnvironments()}
	<TickleWobble />
{:then _}
	<select
		id="environmentSelector"
		bind:value={selectedEnvironment}
		class="sm:w-[60%] w-[90%] rounded-lg mt-2 h-8"
	>
		<option value="default">Choose an environment</option>
		{#each Object.entries(environments) as [id, envName]}
			<option value={id}>
				{envName}
			</option>
		{/each}
	</select>
{/await}
