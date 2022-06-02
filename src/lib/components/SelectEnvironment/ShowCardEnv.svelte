<script>
	import { db } from '$lib/firebaseConfig/firebase';
	import { collection, getDocs } from 'firebase/firestore';
	import { store } from '/src/store';

	import produce from 'immer';

	async function loadCards(envId) {
		const snapRef2 = await getDocs(collection(db, 'card-environments', envId, 'cards'));
		const cards = snapRef2.docs.map((doc) => {
			return doc.data();
		});

		store.update((obj) => {
			const nextState = produce(obj, (draft) => {
				const envIndex = draft.envs.findIndex((d) => d.id === envId);
				draft.envs[envIndex].cards = cards;
			});
			console.log('nextState', nextState);
			return nextState;
		});
	}
</script>

<div class="flex flex-col">
	{#each $store.envs as env}
		<button on:click={() => loadCards(env.id)}>{env.name}</button>
	{/each}
</div>

<style>
</style>
